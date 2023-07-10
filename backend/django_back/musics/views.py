import datetime

from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Music
import boto3
from django.http import JsonResponse
from .utils import upload_music


@api_view(['post'])
def upload_mp3(request):
    if request.method == 'POST':

        # POST 요청에서 Mp3 파일 가져오기
        mp3_file = request.FILES['filename']
        music_url = "music created"

        # s3 업로드용 함수
        # upload_music(mp3_file)

        Music.objects.create(
            music_name=request.POST['name'],
            music_context=request.POST['context'],
            music_url=music_url
        )

        return JsonResponse({'code': '201',
                             'message': 'music created',
                             'time': datetime.datetime.now()})
