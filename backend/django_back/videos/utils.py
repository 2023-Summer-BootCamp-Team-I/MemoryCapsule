import cv2
import urllib.request
import numpy as np
import moviepy.editor as mp
import boto3
import os
import random
from stories.models import Story
from videos.models import Video
from capsules.models import *
from musics.models import Music
from celery import shared_task
from datetime import datetime
import pytz
from django.utils import timezone
import logging
from api.message_api import send_normal_message


def make_video(capsule_id, video_number, image_urls, music_url):
  
    s3_client = boto3.client('s3')
    s3_resource = boto3.resource('s3')
    bucket_name = 'memory-capsule'

    output_video_key = f'video-of-capsule{capsule_id}-no{video_number}.mp4'

    # Download and process images
    images = []
    for image_url in image_urls:
        image_data = urllib.request.urlopen(image_url).read()
        image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        images.append(image)

    # Determine video dimensions
    max_height = max(image.shape[0] for image in images)
    max_width = max(image.shape[1] for image in images)

    # Create video writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out_video = cv2.VideoWriter(output_video_key, fourcc, 1, (max_width, max_height))

    try:
        # Write images to video
        for image in images:
            resized_image = cv2.resize(image, (max_width, max_height), interpolation=cv2.INTER_LANCZOS4)
            out_video.write(resized_image)

        # Close video writer
        out_video.release()

        # Download and process music
        music_data = urllib.request.urlopen(music_url).read()
        with open('music.mp3', 'wb') as f:
            f.write(music_data)

        # Load video and music using moviepy
        video_clip = mp.VideoFileClip(output_video_key)
        audio_clip = mp.AudioFileClip('music.mp3')

        # Set audio for the video
        video_clip = video_clip.set_audio(audio_clip)

        # Generate final video with music
        final_output = f'video-of-capsule{capsule_id}-no{video_number}.mp4'
        video_duration = len(images)  # Duration of the video in seconds
        video_clip = video_clip.subclip(0, video_duration)  # Truncate the video to match the duration of the images
        final_clip = mp.concatenate_videoclips([video_clip])
        final_clip.write_videofile(final_output, codec='libx264', audio_codec='aac')

        # Upload the final video to S3
        s3_client.upload_file(final_output, bucket_name, final_output)

        print('video uploaded to S3:', final_output)

        # Delete temporary files
        if os.path.exists(output_video_key):
            os.remove(output_video_key)
        if os.path.exists('music.mp3'):
            os.remove('music.mp3')
        if os.path.exists(final_output):
            os.remove(final_output)

        return f'https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{final_output}'

    finally:
        # Clean up video writer
        if out_video.isOpened():
            out_video.release()
        cv2.destroyAllWindows()
        if os.path.exists(output_video_key):
            os.remove(output_video_key)


def random_video_url_maker(capsule, stories):
    story_id_list = []
    for story in stories:
        story_id_list.append(story.story_id)
    story_id_list.sort()
    story_count = len(story_id_list)

    unique_values = set()
    video_image_list_ready = []

    if story_count < capsule.limit_count:
        for i in range(story_count):
            for j in range(2):
                video_image_list_ready.append(story_id_list[i])
    else:
        while len(video_image_list_ready) < capsule.limit_count:
            random_number = random.randint(1, len(story_id_list) - 1)
            if random_number in unique_values:
                continue
            video_image_list_ready.append(random_number)
            unique_values.add(random_number)

    video_image_list_ready.sort()
    video_image_url_list = []
    for story_id in video_image_list_ready:
        story = Story.objects.get(story_id=story_id)
        for j in range(2):
            # 비디오 제작에 넘길 이미지 url 배열
            video_image_url_list.append(story.story_img_url)

    return video_image_url_list


@shared_task
def default_video_maker(capsule_id, music_id):
    capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    stories = Story.objects.filter(capsule_id=capsule_id, deleted_at__isnull=True)

    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

    video_url = '캡슐에 스토리가 없어 비디오가 생성되지 않았어요!'
    if stories.exists():
        video_image_url_list_final = random_video_url_maker(capsule, stories)
        music_url = Music.objects.get(music_id=music_id, deleted_at__isnull=True).music_url

        # 캡슐 비디오 개수로 비디오 url 만듦 (비디오 url은 video_of_{capsule_id}_no{video_count})
        video_count = Video.objects.filter(capsule=capsule_id).count() + 1

        # 로그 남기기
        logger.info(f'Video creation complete for capsule {capsule_id} at {timezone.now()}')

        video_url = make_video(capsule_id, video_count, video_image_url_list_final, music_url)  # 회원 아이디, 회원 비디오 개수,
        # s3 업로드 용 함수

    # 일반 메세지 전송
    user_capsules = UserCapsule.objects.filter(capsule_id=capsule_id, deleted_at__isnull=True)
    user_phone_number_list = [user_capsule.user.phone_number for user_capsule in user_capsules]
    logger.info(f'{user_phone_number_list}')
    title = f'드디어 {capsule.capsule_name}이 열렸어요!!'
    text = f'드디어 {capsule.capsule_name}이 열렸어요!! 어서 확인하러 가봐요!! 확인하러 가기: 사이트 주소'
    send_normal_message(user_phone_number_list, title, text)
    logger.info(f'메세지 전송 완료! {capsule_id} at {timezone.now()}')

    return video_url



def user_choice_video_maker(capsule, music, user_choice_list):
    video_count = Video.objects.filter(capsule=capsule.capsule_id).count() + 1
    music_url = music.music_url
    return make_video(capsule.capsule_id, video_count, user_choice_list, music_url)
