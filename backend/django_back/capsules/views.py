import json
from datetime import datetime
import pytz
from django.db import IntegrityError
from django.utils import timezone

from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from rest_framework.exceptions import ValidationError

from .models import Capsule
from .models import UserCapsule
from users.models import User
from images.views import upload_image_for_api

from .serializers import CapsuleSerializer

# /api/v1/capsules/capsule_func/
@api_view(['GET', 'POST'])
def capsule_func(request) -> json:
    result: json
    status_code: int
    # Capsule list 조회
    if request.method == 'GET':
        result, status_code = capsule_GET(request)

    # Capsule 생성
    elif request.method == 'POST':
        result, status_code = capsule_POST(request)

    return JsonResponse(result, safe=False, status=status_code)


@api_view(['GET', 'PUT', 'DELETE'])
def capsule_url_parm_func(request, capsule_id):
    result: json
    status_code: int

    # 개별 캡슐 정보 반환
    if request.method == 'GET':
        result, status_code = capsule_url_parm_GET(request, capsule_id)

    # 캡슐 정보 수정
    elif request.method == 'PUT':
        result, status_code = capsule_url_parm_PUT(request, capsule_id)

    # 캡슐 정보 삭제
    elif request.method == 'DELETE':
        result, status_code = capsule_url_parm_DELETE(request, capsule_id)

    return JsonResponse(result, safe=False, status=status_code)

@api_view(['GET', 'POST', 'DELETE'])
def user_capsule_func(request):
    result: json
    status_code: int

    # 개별 캡슐 정보 반환
    if request.method == 'GET':
        result, status_code = user_capsule_GET(request)

    # 캡슐 정보 수정
    elif request.method == 'POST':
        result, status_code = user_capsule_POST(request)

    # 캡슐 정보 삭제
    elif request.method == 'DELETE':
        result, status_code = capsule_parm_DELETE(request)

    return JsonResponse(result, safe=False, status=status_code)

def capsule_GET(request) -> (json, int):
    is_open: bool = json.loads((request.GET.get('is_open', 'False').lower()))
    count: int = int(request.GET.get('count', 5))
    user_id: int = int(request.GET.get('user_id', 1))

    # due_date 가 현재 날짜보다 큰 경우는 open 되어 있는 캡슐이므로, __gt를 통해 open 되어 있는 캡슐을 가져왔다
    # 열려 있는 캡슐의 경우 due_date가 가까운 순으로 정렬하였다
    if is_open:
        my_capsules = Capsule.objects.filter(creator_id=user_id, due_date__gt=timezone.now(),
                                             deleted_at__isnull=True).order_by('due_date')
        # my_capsules = Capsule.objects.all()
        capsules = Capsule.objects.exclude(creator_id=user_id).filter(due_date__gt=timezone.now(),
                                                                      deleted_at__isnull=True).order_by('due_date')
    # due_date 가 현재 날짜보다 작거나 같은 경우는 close 되어 있는 캡슐이므로, __lte를 통해 closed 되어 있는 캡슐을 가져온다
    # 닫혀 있는 캡슐의 경우 닫힌 날짜(due_date) 가 최신순이 되도록 입력하였다
    else:
        my_capsules = Capsule.objects.filter(creator_id=user_id, due_date__lte=timezone.now(),
                                             deleted_at__isnull=True).order_by('-due_date')
        capsules = Capsule.objects.exclude(creator_id=user_id).filter(due_date__lte=timezone.now(),
                                                                      deleted_at__isnull=True).order_by('-due_date')

    if count != -1:
        my_capsules = my_capsules[:count]
        capsules = my_capsules[:count]

    my_capsules_list = []
    capsules_list = []

    for capsule in my_capsules:
        capsule_data = {
            'capsule_id': capsule.capsule_id,
            'creator_id': capsule.creator_id,
            'theme_id': capsule.theme_id,
            'capsule_name': capsule.capsule_name,
            'due_date': capsule.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            'limit_count': capsule.limit_count,
            'capsule_img_url': capsule.capsule_img_url,
            'created_at': capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': capsule.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
        my_capsules_list.append(capsule_data)

    for capsule in capsules:
        capsule_data = {
            'capsule_id': capsule.capsule_id,
            'creator_id': capsule.creator_id,
            'theme_id': capsule.theme_id,
            'capsule_name': capsule.capsule_name,
            'due_date': capsule.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            'limit_count': capsule.limit_count,
            'capsule_img_url': capsule.capsule_img_url,
            'created_at': capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': capsule.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
        capsules_list.append(capsule_data)

    result = {
        'code': 200,
        'message': '캡슐 리스트 전송',
        'my_capsule_list': my_capsules_list,
        'capsule_list': capsules_list,
        'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    return result, 200

def capsule_POST(request) -> (json, int):
    if 'file_name' not in request.FILES:
        return {'code': 400, 'message': '파일이 제공되지 않았습니다.'}, 400

    val: json
    status_code: int

    serializer = CapsuleSerializer(data=request.POST)
    capsule_img_url = upload_image_for_api(request.FILES['file_name'])

    if serializer.is_valid():
        serializer.validated_data['capsule_img_url'] = capsule_img_url
        instance = serializer.save(capsule_img_url=capsule_img_url)

        try:
            user_capsule = UserCapsule.objects.create(capsule_id=instance.capsule_id, user_id=instance.creator_id)
        except:
            return {'code': 400, 'message': ' 다시 확인해 주세요.'}, 400

        status_code = 201
        val = {
            'code': 201,
            'message': 'capsule이 생성되었습니다',
            'capsule_id': instance.capsule_id,
            'capsule_name': instance.capsule_name,
            'creator_id': instance.creator_id,
            'theme_id': instance.theme_id,
            'due_date': instance.due_date,
            'limit_count': instance.limit_count,
            'capsule_img_url': instance.capsule_img_url,
            'created_at': instance.created_at,
            'updated_at': instance.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
        }
    else:
        status_code = 400
        val = {
            'code': 400,
            'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.',
        }

    return val, status_code

def capsule_url_parm_GET(request, capsule_id) -> (json, int):

    capsule = Capsule.objects.filter(deleted_at__isnull=True, capsule_id=capsule_id).first()
    if not capsule:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    capsule_data = {
        'capsule_id': capsule.capsule_id,
        'creator_id': capsule.creator_id,
        'theme_id': capsule.theme_id,
        'capsule_name': capsule.capsule_name,
        'due_date': capsule.due_date.strftime('%Y-%m-%d %H:%M:%S'),
        'limit_count': capsule.limit_count,
        'capsule_img_url': capsule.capsule_img_url,
        'created_at': capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updated_at': capsule.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
    }

    result = {
        'code': 200,
        'message': '개별 캡슐 정보 전송',
        'capsule_data': capsule_data,
        'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    return result, 200

def capsule_url_parm_PUT(request, capsule_id) -> (json, int):
    if 'file_name' not in request.FILES:
        return {'code': 400, 'message': '파일이 제공되지 않았습니다.'}, 400

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    serializer = CapsuleSerializer(capsule, data=request.POST)

    if serializer.is_valid():
        if capsule.creator_id != int(request.POST['creator_id']):
            return {'code': 404, 'message': '캡슐 수정 권한이 없습니다'}, 404

        capsule_img_url = upload_image_for_api(request.FILES['file_name'])
        serializer.validated_data['capsule_img_url'] = capsule_img_url
        serializer.save()

        updated_capsule = Capsule.objects.get(capsule_id=capsule_id)
        result = {
            'code': 200,
            'message': '캡슐이 수정되었습니다.',
            'capsule_id': updated_capsule.capsule_id,
            'creator_id': updated_capsule.creator_id,
            'theme_id': updated_capsule.theme_id,
            'capsule_name': updated_capsule.capsule_name,
            'due_date': updated_capsule.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            'limit_count': updated_capsule.limit_count,
            'capsule_img_url': updated_capsule.capsule_img_url,
            'created_at': updated_capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': updated_capsule.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        return result, 200
    else:
        return {'code': 400, 'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.'}, 400

def capsule_url_parm_DELETE(request, capsule_id) -> (json, int):
    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
        capsule.deleted_at = timezone.now()
        capsule.save()
        return {'code': 200, 'message': '캡슐 삭제 완료', 'deleted_at': capsule.deleted_at,
                'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')}, 200
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

def user_capsule_GET(request) -> (json, int):
    capsule_id: int = int(request.GET.get('capsule_id', 1))
    user_id: int = int(request.GET.get('user_id', 1))

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    # 현재 캡슐에 포함된 유저가 맞는지 체크
    try:
        UserCapsule.objects.get(user_id=user_id, capsule_id=capsule_id)
    except UserCapsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐에 포함되지 않은 유저입니다'}, 404

    # host user를 가져와서 정보를 저장
    try:
        user = User.objects.get(user_id=capsule.creator_id, deleted_at__isnull=True)
        host_user = {
            'user_id': user.user_id,
            'nickname': user.nickname,
            'user_img_url': user.user_img_url,
        }
    except User.DoesNotExist:
        return {'code': 404, 'message': '호스트 유저가 삭제 되었습니다'}, 404

    user_capsules = UserCapsule.objects.exclude(user_id=capsule.creator_id).filter(capsule_id=capsule_id)
    user_list = []

    for user_capsule in user_capsules:
        user_data = {
            'user_id': user_capsule.user.user_id,
            'nickname': user_capsule.user.nickname,
            'user_img_url': user_capsule.user.user_img_url,
        }
        user_list.append(user_data)

    result = {
        'code': 200,
        'message': '캡슐의 유저들을 조회하였습니다',
        'host_user': host_user,
        'user': user_list,
        'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    return result, 200

def user_capsule_POST(request) -> (json, int):
    capsule_id: int = request.POST['capsule_id']
    user_id: int = request.POST['user_id']

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    try:
        user = User.objects.get(user_id=user_id, deleted_at__isnull=True)
    except User.DoesNotExist:
        return {'code': 404, 'message': '유저를 찾을 수 없습니다.'}, 404

    if UserCapsule.objects.filter(capsule_id=capsule_id, user_id=user_id):
        return {'code': 400, 'message': '이미 캡슐에 포함된 유저입니다.'}, 400

    try:
        user_capsule = UserCapsule.objects.create(capsule_id=capsule_id, user_id=user_id)
    except (ValidationError, IntegrityError) as e:
        return {'code': 400, 'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.'}, 400

    result = {
        'code': 201,
        'message': '유저가 캡슐에 입장하였습니다',
        'data': {
            'user_capsule_id': user_capsule.user_capsule_id,
            'user_id': user_capsule.user_id,
            'capsule_id': user_capsule.capsule_id,
            'created_at': user_capsule.created_at,
        },
        'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S'),
    }

    return result, 200

