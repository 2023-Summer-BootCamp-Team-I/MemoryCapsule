from django.utils import timezone
from .tasks import create_user_choice_video
from django.http import Http404, JsonResponse
from videos.models import Video
from capsules.models import Capsule
from users.models import User
from stories.models import Story, StoryVideo
from musics.models import Music
from core.uuid_decode import *

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view


@swagger_auto_schema(
    method='get',
    tags=["영상 조회"],
    description="""default_video는 캡슐 기간이 종료 되었을 때 자동 생성되는 비디오고 ,
                added_video는 자동 생성 이후 유저가 선택한 스토리들을 기준으로 캡슐 기간 종류 이후 생성할 수 있는 비디오 입니다."""
)
@swagger_auto_schema(
    method='post',
    tags=["유저 선택 스토리 영상 제작"],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'jwt_token': openapi.Schema(type=openapi.TYPE_STRING, description="jwt token 입력", ),
            'music_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='음악 아이디'),
            'user_choice_image': openapi.Schema(type=openapi.TYPE_ARRAY,
                                                items=openapi.Schema(type=openapi.TYPE_INTEGER), description='비디오 리스트'),
        }
    )
)



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
            user_uuid_obj = get_user_uuid_obj_from_jwt(request.data['jwt_token'])
            user = User.objects.get(pk=user_uuid_obj)

            capsule = Capsule.objects.get(pk=capsule_id)
            music = Music.objects.get(music_id=request.data['music_id'])
            user_choice_list = request.data.get("user_choice_image", [])

            user_choice_list.sort()
            user_choice_url_list = []
            for story_id in user_choice_list:
                story_image = Story.objects.get(pk=story_id).story_img_url
                user_choice_url_list.append(story_image)

            async_video_url = create_user_choice_video.delay(capsule.capsule_id, music.music_id, user_choice_url_list, user.user_id)
            video_url = async_video_url.wait()
            video = Video.objects.get(story_video_url=video_url)

            return JsonResponse({
                'code': 201,
                'message': '사용자 선택 영상 제작 완료',
                'video_url': video_url,
                'created_at': video.created_at
            })
        except Exception as e:
            error_message = str(e)
            return JsonResponse({'code': 500, 'message': error_message, 'time': timezone.now()})
