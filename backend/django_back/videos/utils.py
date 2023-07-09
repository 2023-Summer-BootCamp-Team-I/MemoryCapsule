import boto3
import cv2
import urllib.request
import numpy as np
import io

def make_video():
    s3_client = boto3.client('s3')
    s3_resource = boto3.resource('s3')

    bucket_name = 'your-bucket-name'
    image_urls = [
        'https://author-picture.s3.ap-northeast-2.amazonaws.com/e5b5c3ee-cee3-4c9d-8c8b-1fbb6c0fc601',
        'https://author-picture.s3.ap-northeast-2.amazonaws.com/8c84b7c8-81fe-4bff-88fc-c44ab6eb9432',
        'https://author-picture.s3.ap-northeast-2.amazonaws.com/8c84b7c8-81fe-4bff-88fc-c44ab6eb9432'

    ]
    output_video_key = 'output-video.mp4'

    # 이미지들의 최대 너비와 높이 구하기
    max_width = 0
    max_height = 0

    for image_url in image_urls:
        # 이미지 다운로드
        image_data = urllib.request.urlopen(image_url).read()
        image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        height, width, _ = image.shape

        if width > max_width:
            max_width = width
        if height > max_height:
            max_height = height

    out_video = None

    for image_url in image_urls:
        # 이미지 다운로드
        image_data = urllib.request.urlopen(image_url).read()
        image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        # 이미지 크기 조정
        resized_image = cv2.resize(image, (max_width, max_height), interpolation=cv2.INTER_LANCZOS4)

        if out_video is None:
            # 영상 파일 생성 및 설정
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out_video = cv2.VideoWriter(output_video_key, fourcc, 1, (max_width, max_height))

        # 이미지를 프레임으로 추가하여 영상에 저장
        out_video.write(resized_image)

    out_video.release()

    # 영상 파일을 S3에 업로드
    with open(output_video_key, 'rb') as file:
        s3_resource.Bucket(bucket_name).put_object(Key=output_video_key, Body=file)

    print('Output video uploaded to S3:', output_video_key)