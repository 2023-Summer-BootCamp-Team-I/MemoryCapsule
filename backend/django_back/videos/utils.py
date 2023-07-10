import cv2
import urllib.request
import numpy as np
import moviepy.editor as mp
import boto3
import os

def make_video(user_id, video_number, image_urls, music_url):
    s3_client = boto3.client('s3')
    s3_resource = boto3.resource('s3')
    bucket_name = 'author-picture'

    output_video_key = f'video-of-{user_id}-no{video_number}.mp4'

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
        final_output = f'final_video_of_{user_id}_no_{video_number}.mp4'
        video_duration = len(images)  # Duration of the video in seconds
        video_clip = video_clip.subclip(0, video_duration)  # Truncate the video to match the duration of the images
        final_clip = mp.concatenate_videoclips([video_clip])
        final_clip.write_videofile(final_output, codec='libx264', audio_codec='aac')

        # Upload the final video to S3
        s3_client.upload_file(final_output, bucket_name, final_output)

        print('Final video uploaded to S3:', final_output)

        # Delete temporary files
        os.remove(output_video_key)
        os.remove('music.mp3')
        os.remove(final_output)

        return f'https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{final_output}'

    finally:
        # Clean up video writer
        if out_video.isOpened():
            out_video.release()
        cv2.destroyAllWindows()
        if os.path.exists(output_video_key):
            os.remove(output_video_key)