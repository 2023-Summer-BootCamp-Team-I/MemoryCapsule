import datetime
import random
import json
from rest_framework.parsers import JSONParser
from django.utils import timezone
from rest_framework.decorators import api_view
from .tasks import create_user_choice_video
from django.http import Http404, JsonResponse
from videos.models import Video
from capsules.models import Capsule
from users.models import User
from stories.models import Story, StoryVideo
from musics.models import Music


@api_view(['get', 'post'])
def video_work(request, capsule_id):
    if request.method == 'GET':
        try:

            videos = Video.objects.filter(capsule=capsule_id)
            default_video = videos.first()

            data = {
                'default_video': {
                    "creator_id": default_video.creator_id,
                    "creator_nickname": User.objects.get(pk=default_video.creator_id).nickname,
                    "video_url": default_video.story_video_url,
                    "music_name": default_video.music.music_name,
                    "created_at": default_video.created_at
                },
                'added_video': []
            }

            for video in videos:
                if not default_video.video_id == video.video_id:
                    data['added_video'].append({
                        "creator_id": default_video.creator_id,
                        "creator_nickname": User.objects.get(pk=default_video.creator_id).nickname,
                        "video_url": video.story_video_url,
                        "music": default_video.music.music_name,
                        "created_at": video.created_at
                    })

            return JsonResponse({'code': 200, 'data': data, 'time': timezone.now()})
        except Exception as e:
            error_message = str(e)
            return JsonResponse({'code': 404, 'message': error_message, 'time': timezone.now()})

    if request.method == 'POST':
        try:
            capsule = Capsule.objects.get(pk=capsule_id)
            creator = User.objects.get(user_id=request.data['creator_id'])
            music = Music.objects.get(music_id=request.data['music_id'])
            user_choice_list = request.data.get("user_choice_image", [])

            user_choice_url_list = []
            for story_id in user_choice_list:
                story_image = Story.objects.get(pk=story_id).story_img_url
                for i in range(2):
                    user_choice_url_list.append(story_image)
            user_choice_url_list.sort()

            async_video_url = create_user_choice_video.delay(capsule, music, user_choice_url_list)
            video_url = async_video_url.wait()

            video = Video.objects.create(
                creator=creator,
                capsule=capsule,
                music=music,
                story_video_url=video_url
            )

            # story_video 테이블 생성용
            for story_id in user_choice_list:
                StoryVideo.objects.create(
                    story=Story.objects.get(pk=story_id),
                    video=video
                )

            return JsonResponse({
                'code': 201,
                'message': '사용자 선택 영상 제작 완료',
                'video_url': video_url,
                'created_at': video.created_at
            })
        except Exception as e:
            error_message = str(e)
            return JsonResponse({'code': 500, 'message': error_message, 'time': timezone.now()})

