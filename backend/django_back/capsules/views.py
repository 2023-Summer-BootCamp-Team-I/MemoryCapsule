from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import StorySerializer
from .models import Story, Capsule, Video
from users.models import User
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.
@api_view(['POST', 'GET'])
def story_create(request, capsule_id):

    if request.method == 'POST':
        try:
            capsule = Capsule.objects.get(capsule_id=capsule_id)
        except Capsule.DoesNotExist:
            return JsonResponse({"code": "404", "message": "Capsule이 존재하지 않습니다."}, status=404)

        user = capsule.user_id.all().first()
        video = Video.objects.get(video_id = request.data['video_id'])
        story = Story.objects.create(
            story_id=request.data['story_id'],
            creator_id=user,
            capsule_id=capsule,
            story_title=request.data['story_title'],
            story_content=request.data['story_content'],
            story_img_url=request.data['story_img_url'],
        )
        story.video_id.set([video])

        return JsonResponse({
            "code": "201",
            "message": "스토리 생성이 완료되었습니다.",
            "capsule_id": capsule.capsule_id,
            "story_title": story.story_title,
            "story_content": story.story_content,
            "story_img_url": story.story_img_url,
            "created_at": story.created_at,
            "story_id": story.story_id
        })

    else:
        return JsonResponse({"code": "400", "message": "스토리 생성에 실패하였습니다."}, status=400)

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
