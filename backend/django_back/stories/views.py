from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Story
from capsules.models import Capsule
from users.models import User
from images.views import upload_image_for_api
from django.http import HttpResponse, JsonResponse
from django.utils import timezone



# Create your views here.


@api_view(['POST', 'GET'])
def story_capsule_func(request, capsule_id):

    if request.method == 'POST':
        try:
            capsule = Capsule.objects.get(capsule_id=capsule_id)
        except Capsule.DoesNotExist:
            return JsonResponse({"code": 404, "message": "캡슐이 존재하지 않습니다."}, status=404)
        user = User.objects.get(pk = capsule.creator_id)

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
            "story_id": story.story_id
        })
        return JsonResponse({"code": 400, "message": "스토리 생성에 실패하였습니다."}, status=400)

    elif request.method =='GET':
        try:
            capsule = Capsule.objects.get(capsule_id=capsule_id)
        except Capsule.DoesNotExist:
            return JsonResponse({"code": 404, "message": "캡슐이 존재하지 않습니다."}, status=404)
        story_list = []
        stories = Story.objects.filter(capsule_id=capsule_id, deleted_at__isnull=True)
        for story in stories :
            story_info = {
                "story_id" : story.story_id,
                "story_title" : story.story_title,
                "story_url" : story.story_img_url
            }

            story_list.append(story_info)

        return JsonResponse({
            "code": 200,
            "message": "스토리 이미지 URL 리스트 조회가 완료되었습니다.",
            "capsule_id": capsule.capsule_id,
            "story_list": story_list
            })



@api_view(['GET', 'PUT', 'DELETE'])
def story_func(request, capsule_id, story_id) :
    if request.method == 'GET' :
        try:
            story = Story.objects.get(story_id = story_id, deleted_at__isnull=True)
            capsule = Capsule.objects.get(capsule_id = capsule_id)
        except Story.DoesNotExist:
            return JsonResponse({"code": 404, "message": "스토리가 존재하지 않습니다."}, status=404)

        return JsonResponse({
            "code": 200,
            "message": "스토리 조회가 완료되었습니다.",
            "capsule_id" : capsule.capsule_id,
            "story_title": story.story_title,
            "story_content": story.story_content,
            "story_img_url": story.story_img_url,
            "created_at": story.created_at,
            "updated_at": story.updated_at,
            "story_id": story.story_id
        })

    elif request.method == 'PUT' :
        try:
            story = Story.objects.get(story_id = story_id)
        except Story.DoesNotExist:
            return JsonResponse({"code": 404, "message": "스토리가 존재하지 않습니다."}, status=404)

        #story_img_url =
        if request.method == 'PUT':
            story.story_title = request.data.get('story_title')
            story.story_content = request.data.get('story_content')
            story.story_img_url = upload_image_for_api(request.FILES['filename'])
            story.updated_at = request.data.get('updated_at')
            story.save()

            return JsonResponse({
                "code": 200,
                "message": "스토리 수정이 완료되었습니다.",
                "story_id": story.story_id,
                "story_title": story.story_title,
                "story_content": story.story_content,
                "story_img_url": story.story_img_url,
                "updated_at": story.updated_at,
            })

        return JsonResponse({"code": 400, "message": "스토리 수정에 실패하였습니다."}, status=400)

    elif request.method == 'DELETE':
        try:
            story = Story.objects.get(story_id=story_id, deleted_at__isnull=True)
            story.deleted_at = timezone.now()
            story.save()
            return JsonResponse({
                'code': 200, 'message': '스토리 삭제 완료',
                'deleted_at': story.deleted_at,
                'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            })
        except Story.DoesNotExist:
            return JsonResponse({'code': 404, 'message': '스토리를 찾을 수 없습니다.'})


