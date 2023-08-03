import datetime

from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Music
import boto3
from django.http import JsonResponse
from .utils import upload_music

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    methods=['POST'],
    operation_summary="음악 파일 s3에 전송",
    consumes=['multipart/form-data'],
    manual_parameters=[
    openapi.Parameter(
            name="name",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="음악 이름",
    ),
    openapi.Parameter(
            name="context",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="음악 내용",
    ),
    openapi.Parameter(
            name="filename",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="음악 이름",
    )



    ]
)
@api_view(['post'])
@parser_classes([MultiPartParser, FormParser])
def upload_mp3(request):
    if request.method == 'POST':

        # POST 요청에서 Mp3 파일 가져오기
        mp3_file = request.FILES['filename']
        music_url = "music created"


        # music_count = Music.objects.count() + 1

        # music_url = f"https://arthur-picture.s3.ap-northeast-2.amazonaws.com/music-no{music_count}.mp3"


        # s3 업로드용 함수 S3 요금 방지를 위해 테스트 url로 대체
        # 실전에선 music_url을 아래 함수로
        music_url = upload_music(mp3_file)


        Music.objects.create(
            music_name=request.POST['name'],
            music_context=request.POST['context'],
            music_url=music_url
        )

        return JsonResponse({'code': '201',
                             'message': 'music created',
                             'time': datetime.datetime.now(),
                             'mp3_url': music_url
                             })
