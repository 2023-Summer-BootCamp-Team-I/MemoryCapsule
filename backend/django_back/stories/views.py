from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Story
from capsules.models import Capsule
from users.models import User
from images.views import upload_image_for_api
from django.http import HttpResponse, JsonResponse
from django.utils import timezone



# Create your views here.

# @api_view(['GET']) #스토리 리스트 전체 반환
# def story_list_GET(request, capsule_id, story_id):
#
#     if request.method == 'GET':
#         capsule = Capsule.objects.get(capsule_id=capsule_id, due_date__gt=timezone.now(), deleted_at__isnull=True)
#
#         if capsule.due_date <= timezone.now():
#             story = Story.object.get("capsule_id")
#
#             story_list = []
#
#             for story_img_url in capsule:
#                 capsule_data = {
#                     'capsule_img_url': capsule.capsule_img_url,
#                 }
#             story_list.append(capsule_data)
#
#         result = {
#             'code': 200,
#             'message': '캡슐 리스트 전송',
#             'my_capsule_list': my_capsules_list,
#             'capsule_list': capsules_list,
#             'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
#         }
#         return result, 200


@api_view(['POST'])
def story_POST(request, capsule_id):

    if request.method == 'POST':
        try:
            capsule = Capsule.objects.get(capsule_id=capsule_id)
        except Capsule.DoesNotExist:
            return JsonResponse({"code": "404", "message": "Capsule이 존재하지 않습니다."}, status=404)
        user = User.objects.get(pk = capsule.creator_id)

        story_img_url = upload_image_for_api(request.FILES['filename'])
        #user = capsule.creator_id
        #video = Video.objects.get(video_id = request.data['video_id'])
        #video = request.data['video_id']
        story = Story.objects.create(
            creator_id=user,
            capsule_id=capsule,
            #video_id=video,
            story_title=request.data['story_title'],
            story_content=request.data['story_content'],
            story_img_url= story_img_url,
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

# @api_view(['GET'])
# def story_detail(request, capsule_id, story_id) :
#     if request.method == 'GET' :
#         try:
#             story = Story.objects.get(story_id = story_id)
#             capsule = Capsule.objects.get(capsule_id = capsule_id)
#         except Story.DoesNotExist:
#             return JsonResponse({"code": "404", "message": "Story가 존재하지 않습니다."}, status=404)
#
#         return JsonResponse({
#             "code": "200",
#             "message": "스토리 조회가 완료되었습니다.",
#             "capsule_id" : capsule.capsule_id,
#             "story_title": story.story_title,
#             "story_content": story.story_content,
#             "story_img_url": story.story_img_url,
#             "created_at": story.created_at,
#             "updated_at": story.updated_at,
#             "story_id": story.story_id
#         })
#     # if request.method == "POST" :
#     #     serializer = StorySerializer(data=request.POST)
#     #     story_info = []
#     #     val = {}
#     #
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         val = {
#     #             "code": "201",
#     #             "message": "스토리 생성이 완료되었습니다.",
#     #             "capsule_id": serializer.data["capsule_id"],
#     #             "creator_id":serializer.data["creator_id"],
#     #             "story_title": serializer.data["story_title"],
#     #             "story_content": serializer.data["story_content"],
#     #             "story_img_url":serializer.data["story_img_url"],
#     #             "story_id": serializer.data["story_id"]
#     #         }
#     #
#     #     # else:
#     #     #     status_code = 400
#     #     #     val = {
#     #     #         'code' : "400",
#     #     #         'message' : '입력 오류'
#     #     #     }
#     #
#     # return JsonResponse(val)
# @api_view(['PUT'])
# def story_update(request, capsule_id, story_id):
#
#
#     try:
#         story = Story.objects.get(story_id = story_id)
#     except story.DoesNotExist:
#         return JsonResponse({"code": "404", "message": "스토리가 존재하지 않습니다."}, status=404)
#
#     if request.method == 'PUT':
#         story.story_title = request.data.get('story_title')
#         story.story_content = request.data.get('story_content')
#         story.story_img_url = request.data.get('story_img_url')
#         story.updated_at = request.data.get('updated_at')
#         story.save()
#
#         return JsonResponse({
#             "code": "200",
#             "message": "스토리 수정이 완료되었습니다.",
#             "story_id": story.story_id,
#             "story_title": story.story_title,
#             "story_content": story.story_content,
#             "story_img_url": story.story_img_url,
#             "updated_at": story.updated_at,
#         })
#
#     return JsonResponse({"code": "400", "message": "스토리 수정에 실패하였습니다."}, status=400)
#
# @api_view(['DELETE'])
# def story_delete(request, capsule_id, story_id):
#     try:
#         story = Story.objects.get(story_id=story_id, deleted_at__isnull=True)
#         story.deleted_at = timezone.now()
#         story.save()
#         return JsonResponse({
#             'code': 200, 'message': '스토리 삭제 완료',
#             'deleted_at': story.deleted_at,
#             'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
#         })
#     except Story.DoesNotExist:
#         return JsonResponse({'code': 404, 'message': '스토리를 찾을 수 없습니다.'})


@api_view(['GET', 'PUT', 'DELETE'])
def story_func(request, capsule_id, story_id) :
    if request.method == 'GET' :
        try:
            story = Story.objects.get(story_id = story_id, deleted_at__isnull=True)
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

    elif request.method == 'PUT' :
        try:
            story = Story.objects.get(story_id = story_id)
        except story.DoesNotExist:
            return JsonResponse({"code": "404", "message": "스토리가 존재하지 않습니다."}, status=404)

        #story_img_url =
        if request.method == 'PUT':
            story.story_title = request.data.get('story_title')
            story.story_content = request.data.get('story_content')
            story.story_img_url = upload_image_for_api(request.FILES['filename'])
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

