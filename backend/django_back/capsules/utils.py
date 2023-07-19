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

from bcrypt import checkpw
import bcrypt

from .serializers import CapsuleSerializer
from django_back.celery import revoke_task

from django_back.tasks import schedule_video_creation


def check_encrypted_password(input_password, current_password):
    return checkpw(input_password.encode('utf-8'), current_password.encode('utf-8'))


def get_encrypted_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


# Capsule 전 조회
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


# Capsule 생성
def capsule_POST(request) -> (json, int):
    if 'img_file' not in request.FILES:
        return {'code': 400, 'message': '파일이 제공되지 않았습니다.'}, 400

    due_date_str = request.POST.get('due_date')
    due_date = datetime.strptime(due_date_str, '%Y-%m-%d %H:%M:%S')

    # if timezone.now().date() >= due_date.date():
    #     return {'code': 400, 'message': '개봉 날짜가 현재 날짜와 같거나 빠릅니다.'}, 400

    val: json
    status_code: int

    serializer = CapsuleSerializer(data=request.POST)
    capsule_img_url = upload_image_for_api(request.FILES['img_file'])
    capsule_password = get_encrypted_password(request.POST['capsule_password'])

    if serializer.is_valid():
        instance = serializer.save(capsule_img_url=capsule_img_url, capsule_password=capsule_password)

        try:
            user_capsule = UserCapsule.objects.create(capsule_id=instance.capsule_id, user_id=instance.creator_id)
        except:
            return {'code': 400, 'message': ' 다시 확인해 주세요.'}, 400

        # schedule_video_creation task 예약
        task_id = schedule_video_creation(instance.capsule_id, instance.due_date)
        serializer.save(task_id=task_id)

        status_code = 201
        result = {
            'code': 201,
            'message': 'capsule이 생성되었습니다',
            'capsule_id': instance.capsule_id,
            'capsule_name': instance.capsule_name,
            'capsule_password': instance.capsule_password,
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
        result = {
            'code': 400,
            'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.',
        }

    return result, status_code


# 개별 캡슐 정보 반환
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
        'capsule_password': capsule.capsule_password,
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


# 캡슐 password 확인
def capsule_url_parm_POST(request, capsule_id) -> (json, int):
    try:
        json_data = json.loads(request.body)
    except json.JSONDecodeError:
        return {'code': 400, 'message': '올바른 JSON 형식이 아닙니다.'}, 400

    user_id = json_data.get('user_id')
    capsule_password = json_data.get('capsule_password')

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    try:
        UserCapsule.objects.get(capsule_id=capsule_id, user_id=user_id, deleted_at__isnull=True)
    except UserCapsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐에 포함된 유저가 아닙니다.'}, 404

    if not check_encrypted_password(capsule_password, capsule.capsule_password):
        return {'code': 404, 'message': '캡슐 비밀번호가 잘못 되었습니다.'}, 404

    result = {
        'code': 200,
        'message': '올바른 password 입니다.',
        'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    return result, 200

# 캡슐 정보 수정
def capsule_url_parm_PUT(request, capsule_id) -> (json, int):
    if 'img_file' not in request.FILES:
        return {'code': 400, 'message': '파일이 제공되지 않았습니다.'}, 400

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    serializer = CapsuleSerializer(capsule, data=request.POST)

    if serializer.is_valid():
        if capsule.creator_id != int(request.POST['creator_id']):
            return {'code': 404, 'message': '캡슐 수정 권한이 없습니다'}, 404

        capsule_img_url = upload_image_for_api(request.FILES['img_file'])
        if not check_encrypted_password(request.POST['current_capsule_password'], capsule.capsule_password):
            return {'code': 404, 'message': '캡슐 비밀번호가 잘못 되었습니다.'}, 404

        # new_capsule_password가 넘어 왔다면, 비밀번호를 변경한다
        if request.POST['new_capsule_password'] != '':
            capsule_password = get_encrypted_password(request.POST['new_capsule_password'])

        # 그렇지 않다면, 기존 password를 그대로 사용한다
        else:
            capsule_password = capsule.capsule_password

        instance = serializer.save(capsule_img_url=capsule_img_url, capsule_password=capsule_password)
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
            'capsule_password': updated_capsule.capsule_password,
            'capsule_img_url': updated_capsule.capsule_img_url,
            'created_at': updated_capsule.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': updated_capsule.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        return result, 200
    else:
        return {'code': 400, 'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.'}, 400


# 캡슐 정보 삭제
def capsule_url_parm_DELETE(request, capsule_id) -> (json, int):
    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
        capsule.deleted_at = timezone.now()
        capsule.save()

        revoke_task(capsule.task_id)

        return {'code': 200, 'message': '캡슐 삭제 완료', 'deleted_at': capsule.deleted_at,
                'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')}, 200
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404


# 개별 캡슐 정보 반환
def user_capsule_GET(request) -> (json, int):
    capsule_id: int = int(request.GET.get('capsule_id', 1))
    user_id: int = int(request.GET.get('user_id', 1))

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    # 현재 캡슐에 포함된 유저가 맞는지 체크
    try:
        UserCapsule.objects.get(user_id=user_id, capsule_id=capsule_id, deleted_at__isnull=True)
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

    user_capsules = UserCapsule.objects.exclude(user_id=capsule.creator_id).filter(capsule_id=capsule_id,
                                                                                   deleted_at__isnull=True)
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


# 캡슐에 유저 추가
def user_capsule_POST(request) -> (json, int):
    try:
        json_data = json.loads(request.body)
    except json.JSONDecodeError:
        return {'code': 400, 'message': '올바른 JSON 형식이 아닙니다.'}, 400
    capsule_id = json_data.get('capsule_id')
    user_id = json_data.get('user_id')
    capsule_password = json_data.get('capsule_password')

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    try:
        user = User.objects.get(user_id=user_id, deleted_at__isnull=True)
    except User.DoesNotExist:
        return {'code': 404, 'message': '유저를 찾을 수 없습니다.'}, 404

    if UserCapsule.objects.filter(capsule_id=capsule_id, user_id=user_id, deleted_at__isnull=True):
        return {'code': 400, 'message': '이미 캡슐에 포함된 유저입니다.'}, 400

    if not check_encrypted_password(capsule_password, capsule.capsule_password):
        return {'code': 404, 'message': '캡슐 비밀번호가 잘못 되었습니다.'}, 404

    try:
        user_capsule = UserCapsule.objects.create(capsule_id=capsule_id, user_id=user_id)
    except (ValidationError, IntegrityError) as e:
        return {'code': 400, 'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.'}, 400


    result = {
        'code': 201,
        'message': '유저가 캡슐에 입장하였습니다',
        'user_capsule_id': user_capsule.user_capsule_id,
        'user_id': user_capsule.user_id,
        'capsule_id': user_capsule.capsule_id,
        'created_at': user_capsule.created_at,
        'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S'),
    }

    return result, 200


# 캡슐 나가기
def user_capsule_DELETE(request) -> (json, int):
    capsule_id: int = int(request.GET.get('capsule_id', 1))
    user_id: int = int(request.GET.get('user_id', 1))

    try:
        capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
    except Capsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐을 찾을 수 없습니다.'}, 404

    try:
        user = User.objects.get(user_id=user_id, deleted_at__isnull=True)
    except User.DoesNotExist:
        return {'code': 404, 'message': '유저를 찾을 수 없습니다.'}, 404

    try:
        user_capsule = UserCapsule.objects.get(capsule_id=capsule_id, user_id=user_id, deleted_at__isnull=True)
        user_capsule.deleted_at = timezone.now()
        user_capsule.save()
    except UserCapsule.DoesNotExist:
        return {'code': 404, 'message': '캡슐에 포함된 유저가 아닙니다.'}, 404

    # host가 방을 나갈 시, host user를 다른 유저로 변경
    # 만약, host가 마지막 유저였을 경우, capsule을 삭제
    if capsule.creator_id == user.user_id:
        try:
            another_user = UserCapsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True).user
            capsule.creator_id = another_user.user_id
            capsule.save()
        except UserCapsule.DoesNotExist:
            capsule = Capsule.objects.get(capsule_id=capsule_id, deleted_at__isnull=True)
            capsule.deleted_at = timezone.now()
            capsule.save()

    return {'code': 200, 'message': '캡슐 나가기 성공', 'deleted_at': user_capsule.deleted_at,
            'time': timezone.now().strftime('%Y-%m-%d %H:%M:%S')}, 200
