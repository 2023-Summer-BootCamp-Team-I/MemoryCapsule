from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Story
from capsules.models import Capsule
from musics.models import Music
from users.models import User
from videos.models import Video
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.
@api_view(['POST'])
def story_create(request, capsule_id):

    if request.method == 'POST':
        try:
            capsule = Capsule.objects.get(capsule_id=capsule_id)
        except Capsule.DoesNotExist:
            return JsonResponse({"code": "404", "message": "Capsule이 존재하지 않습니다."}, status=404)

        user = User.objects.get(pk = capsule.creator_id)
        #user = capsule.creator_id
        #video = Video.objects.get(video_id = request.data['video_id'])
        #video = request.data['video_id']
        story = Story.objects.create(
            story_id=request.data['story_id'],
            creator_id=user,
            capsule_id=capsule,
            #video_id=video,
            story_title=request.data['story_title'],
            story_content=request.data['story_content'],
            story_img_url=request.data['story_img_url'],
        )
        #story.video_id.set([video])
        story.created_at = story.created_at.strftime('%Y-%m-%d %H:%M:%S')
        story.updated_at = story.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        return JsonResponse({
            "code": "201",
            "message": "스토리 생성이 완료되었습니다.",
            "capsule_id": capsule.capsule_id,
            "story_title": story.story_title,
            "story_content": story.story_content,
            "story_img_url": story.story_img_url,
            "created_at": story.created_at,
            "updated_at": story.updated_at,
            "story_id": story.story_id
        })

    else:
        return JsonResponse({"code": "400", "message": "스토리 생성에 실패하였습니다."}, status=400)

@api_view(["GET"])
def story_detail(request, capsule_id, story_id) :
    if request.method == 'GET' :
        try:
            story = Story.objects.get(story_id = story_id)
            capsule = Capsule.objects.get(capsule_id = capsule_id)
        except Story.DoesNotExist:
            return JsonResponse({"code": "404", "message": "Story가 존재하지 않습니다."}, status=404)

        return JsonResponse({
            "code": "200",
            "message": "스토리 조회가 완료되었습니다.",
            "capsule_id" : capsule.capsule_id,
            "story_title": story.story_title,
            "story_content": story.story_content,
            "story_img_url": story.story_img_url,
            "created_at": story.created_at,
            "updated_at": story.updated_at,
            "story_id": story.story_id
        })
    # if request.method == "POST" :
    #     serializer = StorySerializer(data=request.POST)
    #     story_info = []
    #     val = {}
    #
    #     if serializer.is_valid():
    #         serializer.save()
    #         val = {
    #             "code": "201",
    #             "message": "스토리 생성이 완료되었습니다.",
    #             "capsule_id": serializer.data["capsule_id"],
    #             "creator_id":serializer.data["creator_id"],
    #             "story_title": serializer.data["story_title"],
    #             "story_content": serializer.data["story_content"],
    #             "story_img_url":serializer.data["story_img_url"],
    #             "story_id": serializer.data["story_id"]
    #         }
    #
    #     # else:
    #     #     status_code = 400
    #     #     val = {
    #     #         'code' : "400",
    #     #         'message' : '입력 오류'
    #     #     }
    #
    # return JsonResponse(val)
@api_view(['PUT'])
def story_update(request, capsule_id, story_id):

    try:
        story = Story.objects.get(story_id = story_id)
    except story.DoesNotExist:
        return JsonResponse({"code": "404", "message": "스토리가 존재하지 않습니다."}, status=404)

    if request.method == 'PUT':
        story.story_title = request.data.get('story_title')
        story.story_content = request.data.get('story_content')
        story.story_img_url = request.data.get('story_img_url')
        story.updated_at = request.data.get('updated_at')
        story.save()

        return JsonResponse({
            "code": "200",
            "message": "스토리 수정이 완료되었습니다.",
            "story_id": story.story_id,
            "story_title": story.story_title,
            "story_content": story.story_content,
            "story_img_url": story.story_img_url,
            "updated_at": story.updated_at,
        })

    return JsonResponse({"code": "400", "message": "스토리 수정에 실패하였습니다."}, status=400)
