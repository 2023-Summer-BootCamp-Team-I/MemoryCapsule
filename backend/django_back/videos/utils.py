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
from django.utils import timezone
from api.message_api import send_normal_message
from moviepy.editor import *
import logging


def make_video(capsule_id, video_number, image_urls, music_url):
    logger = logging.getLogger(__name__)
    s3_client = boto3.client('s3')
    bucket_name = 'memory-capsule'
    output_video_key = f'video-of-capsule{capsule_id}-no{video_number}.mp4'

    # Download and process images
    images = []
    for idx, image_url in enumerate(image_urls):
        try:
            logger.info(f"Processing image {idx}: {image_url}")
            image_data = urllib.request.urlopen(image_url).read()
            image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
            image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            images.append(image)
        except Exception as e:
            logger.error(f"Failed to process image at {image_url}. Exception: {e}. Skipping...")

    def add_padding(img, desired_width, desired_height):
        old_height, old_width = img.shape[:2]
        final_image = np.zeros((desired_height, desired_width, 3), np.uint8)
        final_image.fill(255) # or whatever color you like

        x_offset = (desired_width - old_width) // 2
        y_offset = (desired_height - old_height) // 2

        final_image[y_offset:y_offset+old_height, x_offset:x_offset+old_width] = img
        return final_image

    # Define desired video dimensions
    desired_width = 1920
    desired_height = 1080

    # Resize images to maintain aspect ratio and add padding if necessary
    images_resized = []
    for image in images:
        old_height, old_width = image.shape[:2]
        ratio = min(desired_width/old_width, desired_height/old_height)
        new_width = int(old_width * ratio)
        new_height = int(old_height * ratio)
        resized_image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_LANCZOS4)
        padded_image = add_padding(resized_image, desired_width, desired_height)
        images_resized.append(padded_image)

    # Create video clips from images (2 seconds for each image)
    clips = [ImageClip(img, duration=2).set_duration(2).set_fps(0.5) for img in images_resized]

    # Concatenate video clips
    video = concatenate_videoclips(clips)

    # Download and process music
    music_data = urllib.request.urlopen(music_url).read()
    with open('music.mp3', 'wb') as f:
        f.write(music_data)

    audio = AudioFileClip('music.mp3')
    final_audio = audio.subclip(0, video.duration)

    # Set audio of the video
    final_video = video.set_audio(final_audio)
    final_output = f'video-of-capsule{capsule_id}-no{video_number}.mp4'
    final_video.write_videofile(final_output, codec='libx264', audio_codec='aac')

    # Upload the final video to S3
    s3_client.upload_file(final_output, bucket_name, final_output)

    # Delete temporary files
    if os.path.exists('music.mp3'):
        os.remove('music.mp3')
    if os.path.exists(final_output):
        os.remove(final_output)

    logger.info(f'Video uploaded to: https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{final_output}')
    try:
        return f'https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{final_output}'

    finally:
        if os.path.exists(output_video_key):
            os.remove(output_video_key)
        cv2.destroyAllWindows()


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

        # s3 업로드 용 함수
        video_url = make_video(capsule_id, video_count, video_image_url_list_final, music_url)  # 회원 아이디, 회원 비디오 개수,

        # 로그 남기기
        logger.info(f'Video creation complete for capsule {capsule_id} at {timezone.now()}')

    # 일반 메세지 전송
    user_capsules = UserCapsule.objects.filter(capsule_id=capsule_id, deleted_at__isnull=True)
    user_phone_number_list = [user_capsule.user.phone_number for user_capsule in user_capsules]
    logger.info(f'{user_phone_number_list}')
    title = f'드디어 {capsule.capsule_name}이 열렸어요!!'
    text = f'드디어 {capsule.capsule_name}이 열렸어요!! 어서 확인하러 가봐요!! 확인하러 가기: 사이트 주소'
    send_normal_message(user_phone_number_list, title, text)
    logger.info(f'메세지 전송 완료! {capsule_id} at {timezone.now()}')

    return video_url


def user_choice_video_maker(capsule_id, music_id, user_choice_list):
    video_count = Video.objects.filter(capsule=capsule_id).count() + 1
    music = Music.objects.get(pk=music_id)
    music_url = music.music_url
    return make_video(capsule_id, video_count, user_choice_list, music_url)