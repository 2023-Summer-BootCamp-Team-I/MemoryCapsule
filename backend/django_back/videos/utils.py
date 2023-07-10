import cv2
import urllib.request
import numpy as np
import boto3
import os
import uuid
from concurrent.futures import ThreadPoolExecutor


def make_video(user_id, video_number, image_urls):
    s3_client = boto3.client('s3')
    s3_resource = boto3.resource('s3')

    bucket_name = 'author-picture'

    output_video_key = f'video-of-{user_id}-no{video_number}.mp4'


    # 이미지 다운로드 및 영상 생성을 위한 이미지 배열
    images = []

    # 이미지 다운로드 및 배열에 추가
    for image_url in image_urls:
        image_data = urllib.request.urlopen(image_url).read()
        image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        images.append(image)

    # 영상 크기 설정 (가장 큰 이미지의 크기 기준)
    max_height = max(image.shape[0] for image in images)
    max_width = max(image.shape[1] for image in images)

    # 영상 파일 생성 및 설정
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out_video = cv2.VideoWriter()

    # 영상 설정 및 S3에 업로드
    s3_client = boto3.client('s3')

    try:
        for i, image in enumerate(images):
            resized_image = cv2.resize(image, (max_width, max_height), interpolation=cv2.INTER_LANCZOS4)
            if i == 0:
                out_video.open(output_video_key, fourcc, 1, (max_width, max_height))
            out_video.write(resized_image)

        # 영상 파일 종료
        out_video.release()

        # S3에 영상 파일 업로드
        with open(output_video_key, 'rb') as f:
            s3_client.upload_fileobj(f, bucket_name, output_video_key)

        print('Output video uploaded to S3:', output_video_key)
        return f'https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{output_video_key}'

    finally:
        # 영상 파일 제거
        if out_video.isOpened():
            out_video.release()
        cv2.destroyAllWindows()
        if os.path.exists(output_video_key):
            os.remove(output_video_key)