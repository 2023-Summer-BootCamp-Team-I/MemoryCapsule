from django.shortcuts import render
from rest_framework.decorators import api_view
from .utils import make_video
from django.http import JsonResponse
from videos.models import Video

@api_view(['get', 'post'])
def video(request):
    if request.method == 'GET':
        # videos = Video.get.filter(capsule_id=capsule_id)


        return JsonResponse({'message': "영상 제작 성공입니다!!",

                             })
    if request.method == 'POST':
        image_urls = [
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/6fba73b7-164c-45f6-b224-6398c283fd06",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/6fba73b7-164c-45f6-b224-6398c283fd06",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/7815cd1a-2b8f-4cd9-9dac-8aba996995cd",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/7815cd1a-2b8f-4cd9-9dac-8aba996995cd",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/28573595-2508-426c-8b5b-6f4d060b8320",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/28573595-2508-426c-8b5b-6f4d060b8320",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/8c84b7c8-81fe-4bff-88fc-c44ab6eb9432",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/8c84b7c8-81fe-4bff-88fc-c44ab6eb9432",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/f806a4aa-baf4-4c1e-850b-29d1aa9ff588",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/f806a4aa-baf4-4c1e-850b-29d1aa9ff588",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/d38f09ff-d567-47a8-9015-6e9f248c6049",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/d38f09ff-d567-47a8-9015-6e9f248c6049",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/6b4703c0-2970-4dc1-8ccd-c0eaaae40c21",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/6b4703c0-2970-4dc1-8ccd-c0eaaae40c21",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/65ed3972-99c2-41ed-9c94-a9b14c047c5e",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/65ed3972-99c2-41ed-9c94-a9b14c047c5e",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/5ee6682a-7dd0-4887-ac4d-51b7c9f8858f",
            # "https://author-picture.s3.ap-northeast-2.amazonaws.com/5ee6682a-7dd0-4887-ac4d-51b7c9f8858f"
        ]

        # music_url = "https://author-picture.s3.ap-northeast-2.amazonaws.com/music-no1.mp3"

        data = []

        video_url = "영상 제작 완료"

        # s3 업로드용 함수
        # make_video(6, 5, image_urls, music_url)  # 회원 아이디, 회원 비디오 개수,
        return JsonResponse({'message': video_url})