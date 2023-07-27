import json

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import JsonResponse, HttpRequest
from rest_framework.decorators import api_view
from musics.models import *
from themes.models import *


# /api/v1/test-data/
@api_view(['GET'])
def insert_test_data(request) -> json:

    # 기존 데이터 전부 삭제
    Music.objects.all().delete()
    Theme.objects.all().delete()


    # Music 데이터 리스트 생성
    music_url = 'https://author-picture.s3.ap-northeast-2.amazonaws.com/music-no1.mp3'
    music_data = [
        {
            'music_id': 1,
            'music_name': 'test',
            'music_context': 'test',
            'music_url': music_url
        },
    ]

    for data in music_data:
        music = Music.objects.create(**data)

    # Theme 데이터 리스트 생성
    theme_img_url = ''
    themes_data = [
        {
            'theme_id': 1,
            'theme_name': 'test',
            'theme_img_url': theme_img_url,
        },
        {
            'theme_id': 2,
            'theme_name': 'test',
            'theme_img_url': theme_img_url,
        },
    ]

    for theme_data in themes_data:
        theme = Theme.objects.create(**theme_data)

    return JsonResponse({'result': 'good'}, safe=False, status=200)
