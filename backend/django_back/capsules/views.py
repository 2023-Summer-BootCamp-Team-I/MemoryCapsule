
import json
from datetime import datetime

from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

from .models import Capsule
from images.views import upload_image_for_api

from .serializers import CapsuleSerializer


# /api/v1/capsules/capsule_func/
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def capsule_func(request) -> json:
    result: json = ""
    status_code: int
    if request.method == 'GET':
        result, status_code = capsule_GET(request)

    elif request.method == 'POST':
        result, status_code = capsule_POST(request)

    elif request.method == 'PUT':
        capsule_GET(request)

    elif request.method == 'DELETE':
        capsule_GET(request)

    return JsonResponse(result, safe=False, status=status_code)


def capsule_GET(request) -> (json, int):
    is_open: bool = json.loads((request.GET.get('is_open', 'False').lower()))
    count: int = int(request.GET.get('count', -1))
    user_id: int = int(request.GET.get('user_id', 1))

    # due_date 가 현재 날짜보다 큰 경우는 open 되어 있는 캡슐이므로, __lt를 통해 open 되어 있는 캡슐을 가져왔다
    if is_open:
        my_capsules = Capsule.objects.filter(user_id=user_id, due_date__gt=datetime.now()).order_by('due_date')[:count]
        capsules = Capsule.objects.exclude(user_id=user_id).filter(due_date__gt=datetime.now()).order_by('due_date')[:count]
    # due_date 가 현재 날짜보다 작거나 같은 경우는 close 되어 있는 캡슐이므로, __gte를 통해 closed 되어 있는 캡슐을 가져온다
    else:
        my_capsules = Capsule.objects.filter(user_id=user_id, due_date__lte=datetime.now()).order_by('due_date')[:count]
        capsules = Capsule.objects.exclude(user_id=user_id).filter(due_date__lte=datetime.now()).order_by('due_date')[:count]

    my_capsules_list = []
    capsules_list = []

    for capsule in my_capsules:
        capsule_data = {
            'capsule_id': capsule.capsule_id,
            'user_id': capsule.user_id,
            'theme_id': capsule.theme_id,
            'capsule_name': capsule.capsule_name,
            'due_date': capsule.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            'limit_count': capsule.limit_count,
            'capsule_img_url': capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'created_at': capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
        my_capsules_list.append(capsule_data)

    for capsule in capsules:
        capsule_data = {
            'capsule_id': capsule.capsule_id,
            'user_id': capsule.user_id,
            'theme_id': capsule.theme_id,
            'capsule_name': capsule.capsule_name,
            'due_date': capsule.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            'limit_count': capsule.limit_count,
            'capsule_img_url': capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'created_at': capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
        capsules_list.append(capsule_data)

    result = {
        'code': 200,
        'message': '캡슐 리스트 전송',
        'my_capsule_list': my_capsules_list,
        'capsule_list': capsules_list,
        'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    return result, 200


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
            'created_at': serializer.data['created_at']
        }
    else:
        status_code = 400
        val = {
            'code': 400,
            'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.',
        }

    return val, status_code
