from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Story
from capsules.models import Capsule
from users.models import User
from images.views import upload_image_for_api
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from core.uuid_decode import *
# Create your views here.

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    methods=['GET'],
    operation_summary="Story 전체 조회",
    manual_parameters=[
        openapi.Parameter(
            name="jwt_token",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="jwt token 입력",
        )
    ]
)
@swagger_auto_schema(
    methods=['POST'],
    operation_summary="Story 생성",
    consumes=['multipart/form-data'],
    manual_parameters=[
        openapi.Parameter(
            name="jwt_token",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="jwt token 입력",
        ),
        openapi.Parameter(
            name="story_title",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="스토리 이름",
        ),

        openapi.Parameter(
            name="story_content",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="스토리 내용",
        ),
        openapi.Parameter(
            name="filename",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="스토리 이미지 파일",
        ),

    ]
)
@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser])
def story_capsule_func(request, capsule_id):

    if request.method == 'POST':
        try:
            capsule = Capsule.objects.get(capsule_id=capsule_id)
        except Capsule.DoesNotExist:
            return JsonResponse({"code": 404, "message": "캡슐이 존재하지 않습니다."}, status=404)
        if timezone.now() > capsule.due_date:
            return JsonResponse({"code" : 404, "message" : 닫힌 })
        user_uuid_obj = get_user_uuid_obj_from_jwt(request.POST['jwt_token'])
        user = User.objects.get(pk=user_uuid_obj)

        if 'filename' not in request.FILES:
            return JsonResponse({
                "code": 400,
                "message": "파일이 제공되지 않았습니다."
            }, status=400)
        story_img_url = upload_image_for_api(request.FILES['filename'])
        #user = capsule.creator_id
        #video = Video.objects.get(video_id = request.data['video_id'])
        #video = request.data['video_id']
        story = Story.objects.create(
            creator=user,
            capsule=capsule,
            #video_id=video,
            story_title=request.data['story_title'],
            story_content=request.data['story_content'],
            story_img_url= story_img_url,
        )
        #user_data = serializers.serialize('python', [user])[0]['fields']
        #story.video_id.set([video])
        story.created_at = story.created_at.strftime('%Y-%m-%d %H:%M:%S')
        story.updated_at = story.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        return JsonResponse({
            "code": 201,
            "message": "스토리 생성이 완료되었습니다.",
            "capsule_id": capsule.capsule_id,
            "story_title": story.story_title,
            "story_content": story.story_content,
            "story_img_url": story.story_img_url,
            "created_at": story.created_at,
            "updated_at": story.updated_at,
            "story_id": story.story_id,
            "creator_id": story.creator_id,
            "is_mine" : story.creator_id == user.user_id
        })
        return JsonResponse({"code": 400, "message": "스토리 생성에 실패하였습니다."}, status=400)

    elif request.method =='GET':
        try:
            capsule = Capsule.objects.get(capsule_id=capsule_id)
        except Capsule.DoesNotExist:
            return JsonResponse({"code": 404, "message": "캡슐이 존재하지 않습니다."}, status=404)

        if timezone.now() < capsule.due_date:
            user_uuid_obj = get_user_uuid_obj_from_jwt(request.GET.get('jwt_token', None))
        else :
            user_uuid_obj = None

        story_list = []
        stories = Story.objects.filter(capsule_id=capsule_id, deleted_at__isnull=True)
        for story in stories :
            story_info = {
                "story_id" : story.story_id,
                "story_title" : story.story_title,
                "story_url" : story.story_img_url,
                "is_mine": story.creator_id == user_uuid_obj
            }

            story_list.append(story_info)

        return JsonResponse({
            "code": 200,
            "message": "스토리 이미지 URL 리스트 조회가 완료되었습니다.",
            "capsule_id": capsule.capsule_id,
            "story_list": story_list

            })




@swagger_auto_schema(
    methods=['GET'],
    operation_summary="Story 조회",
    manual_parameters=[
        openapi.Parameter(
            name="jwt_token",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="jwt token 입력",
        )
    ]
)
@swagger_auto_schema(
    methods=['PUT'],
    operation_summary="Story 수정",
    consumes=['multipart/form-data'],
    manual_parameters=[
        openapi.Parameter(
            name="jwt_token",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="jwt token 입력",
        ),
        openapi.Parameter(
            name="story_title",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="스토리 이름",
        ),
        openapi.Parameter(
            name="story_content",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="스토리 내용",
        ),
        openapi.Parameter(
            name="filename",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="스토리 이미지 파일",
        ),
    ]
)
@swagger_auto_schema(
    methods=['DELETE'],
    operation_summary="Story 삭제",
    manual_parameters=[
        openapi.Parameter(
            name="jwt_token",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="jwt token 입력",
        )
    ]
)

@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser])
def story_func(request, capsule_id, story_id) :

    if request.method == 'GET' :

        user_uuid_obj = get_user_uuid_obj_from_jwt(request.GET.get('jwt_token', None))

        try:
            story = Story.objects.get(story_id = story_id, deleted_at__isnull=True)
            capsule = Capsule.objects.get(capsule_id = capsule_id)
        except Story.DoesNotExist:
            return JsonResponse({"code": 404, "message": "스토리가 존재하지 않습니다."}, status=404)
        if story.creator_id != user_uuid_obj:
            return JsonResponse({"code" : 403,
                                 "message" : "올바른 ID가 아닙니다."})
        return JsonResponse({
            "code": 200,
            "message": "스토리 조회가 완료되었습니다.",
            "creator_id": story.creator_id,
            "capsule_id" : capsule.capsule_id,
            "story_title": story.story_title,
            "story_content": story.story_content,
            "story_img_url": story.story_img_url,
            "created_at": story.created_at,
            "updated_at": story.updated_at,
            "story_id": story.story_id,
            "is_mine" : story.creator_id == user_uuid_obj
        })

    elif request.method == 'PUT':
        user_uuid_obj = get_user_uuid_obj_from_jwt(request.POST['jwt_token'])
        user = User.objects.get(pk=user_uuid_obj)
        try:
            story = Story.objects.get(story_id = story_id)
        except Story.DoesNotExist:
            return JsonResponse({"code": 404, "message": "스토리가 존재하지 않습니다."}, status=404)

        authenticated_user_id = user.user_id
        if story.creator_id == authenticated_user_id:
            story_title = request.data.get('story_title')
            story_content = request.data.get('story_content')
            story_img = request.FILES.get('filename')

            # Update the fields based on their presence in the request data
            if story_title is not None:
                story.story_title = story_title
            if story_content is not None:
                story.story_content = story_content
            if story_img:
                story.story_img_url = upload_image_for_api(story_img)


            story.updated_at = request.data.get('updated_at')
            story.save()

            return JsonResponse({
                "code": 200,
                "message": "스토리 수정이 완료되었습니다.",
                "creator": story.creator_id,
                "story_id": story.story_id,
                "story_title": story.story_title,
                "story_content": story.story_content,
                "story_img_url": story.story_img_url,
                "updated_at": story.updated_at,
            })
        else:
            return JsonResponse({
                'code': 403,
                'message': '스토리 삭제 권한이 없습니다.'
            }, status=403)

        return JsonResponse({"code": 400, "message": "스토리 수정에 실패하였습니다."}, status=400)

    elif request.method == 'DELETE':
        user_uuid_obj = get_user_uuid_obj_from_jwt(request.GET.get('jwt_token', None))

        try:
            story = Story.objects.get(story_id=story_id, deleted_at__isnull=True)

            if story.creator_id == user_uuid_obj:
                story.deleted_at = timezone.now()
                story.save()
                return JsonResponse({
                    'code': 200,
                    'message': '스토리 삭제 완료',
                    'deleted_at': story.deleted_at,
                    'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
                })
            else:
                return JsonResponse({
                    'code': 403,
                    'message': '스토리 삭제 권한이 없습니다.'
                }, status=403)
            story.deleted_at = timezone.now()
            story.save()

            return JsonResponse({
                'code': 200, 'message': '스토리 삭제 완료',
                'deleted_at': story.deleted_at,
                'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            })
        except Story.DoesNotExist:
            return JsonResponse({'code': 404, 'message': '스토리를 찾을 수 없습니다.'})
