from .models import Music
import boto3


def upload_music(mp3_file):
    bucket_name = 'memory-capsule'  # S3 버킷 이름

    music_count = Music.objects.count() + 1

    s3_key = f'music-no{music_count}.mp3'  # S3에 저장될 파일 경로

    # S3 클라이언트 생성 및 Mp3 파일 업로드
    s3_client = boto3.client('s3')
    s3_client.upload_fileobj(mp3_file, bucket_name, s3_key)

    return f'https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{s3_key}'
