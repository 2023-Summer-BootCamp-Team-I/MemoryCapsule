import datetime
import random
import json
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from .utils import make_video, random_video_url_maker
from django.http import JsonResponse
from videos.models import Video
from capsules.models import Capsule
from users.models import User
from stories.models import Story, StoryVideo
from musics.models import Music


@api_view(['get', 'post'])
def video_work(request, capsule_id):
    if request.method == 'GET':
        videos = Video.objects.filter(capsule=capsule_id)
        default_video = videos.first()

        data = {
            'default_video': {
                "creator_id": default_video.creator,
                "video_url": default_video.story_video_url,
                "music": default_video.music,
                "created_at": default_video.created_at
            },
            'added_video': []
        }

        for video in videos:
            data['added_video'].append({
                "creator_id": video.creator,
                "video_url": video.story_video_url,
                "music": default_video.music,
                "created_at": video.created_at
            })

        return JsonResponse({'code': 200, 'data': data, 'time': datetime.datetime.now()})
    if request.method == 'POST':

        capsule = Capsule.objects.get(capsule_id=capsule_id)
        creator = User.objects.get(user_id=request.data['creator_id'])
        music = Music.objects.get(music_id=request.data['music_id'])

        stories = Story.objects.filter(capsule_id=capsule_id)

        video_image_url_list_final = random_video_url_maker(capsule, creator, stories)

        music_url = music.music_url

        # 캡슐 비디오 개수로 비디오 url 만듦 (비디오 url은 video_of_{user_id}_no{video_count})
        if Video.DoesNotExist:
            video_count = 1
        else:
            video_count = Video.objects.filter(capsule=capsule.capsule_id).count() + 1

        # s3 업로드 용 함수
        video_url = make_video(creator.id, video_count, video_image_url_list_final, music_url)  # 회원 아이디, 회원 비디오 개수,

        video = Video.objects.create(
            creator=creator,
            capsule=capsule,
            music=music,
            story_video_url=video_url
        )

        # story_video 테이블 생성용
        for story in stories:
            StoryVideo.objects.create(
                story=story.story_id,
                video=video.video_id
            )

        return JsonResponse({'message': video_url})
