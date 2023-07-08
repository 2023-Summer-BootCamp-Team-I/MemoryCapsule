import json
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

from .forms import PostForm
from .models import Capsule


# /api/v1/capsules/capsule_func/
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def capsule_func(request) -> json:
    result: json = "{}"
    status_code: int
    if request.method == 'GET':
        result, status_code = capsule_GET(request)

    elif request.method == 'POST':
        result, status_code = capsule_POST(request)

    elif request.method == 'PUT':
        capsule_GET(request)

    elif request.method == 'DELETE':
        capsule_GET(request)

    return JsonResponse(result, status=status_code)


def capsule_GET(request) -> (json, int):
    is_open: bool = request.GET['is_open']
    count: int = request.GET['count']
    capsules = Capsule.objects.all().order_by('due_date')
    data = []
    for capsule in capsules:
        capsule_data = {
            'capsule_id': capsule.capsule_id,
            'user_id': capsule.user_id,
            'theme_id': capsule.theme_id,
            'capsule_name': capsule.capsule_name,
            'due_date': capsule.due_date,
            'limit_count': capsule.limit_count,
            'capsule_img_url': capsule.capsule_img_url,
            'created_at': capsule.created_at,
        }
        data.append(capsule_data)


def capsule_POST(request) -> (json, int):
    val: json
    status_code: int

    serializer = CapsuleSerializer(data=request.POST)
    capsule_img_url = upload_image_for_api(request.FILES['file_name'])

    if serializer.is_valid():
        serializer.save()
        status_code = 201
        val = {
            'code': 201,
            'message': 'capsule이 생성되었습니다',
            'capsule_name': serializer.data['capsule_name'],
            'user_id': serializer.data['user_id'],
            'theme_id': serializer.data['theme_id'],
            'due_date': serializer.data['due_date'],
            'limit_count': serializer.data['limit_count'],
            'capsule_img_url': capsule_img_url,
        }
    else:
        status_code = 400
        val = {
            'code': 400,
            'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.',
        }

    return val, status_code

