import json
from django.http import JsonResponse
from .utils import *


# /api/v1/capsules/capsule_func/
@api_view(['GET', 'POST'])
def capsule_func(request) -> json:
    result: json
    status_code: int
    # Capsule 전체 조회
    if request.method == 'GET':
        result, status_code = capsule_GET(request)

    # Capsule 생성
    elif request.method == 'POST':
        result, status_code = capsule_POST(request)

    return JsonResponse(result, safe=False, status=status_code)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def capsule_url_parm_func(request, capsule_id):
    result: json
    status_code: int

    # 개별 캡슐 정보 반환
    if request.method == 'GET':
        result, status_code = capsule_url_parm_GET(request, capsule_id)

    # 캡슐 password 확인
    elif request.method == 'POST':
        result, status_code = capsule_url_parm_POST(request, capsule_id)

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

    # 캡슐에 유저 추가
    elif request.method == 'POST':
        result, status_code = user_capsule_POST(request)

    # 캡슐 나가기
    elif request.method == 'DELETE':
        result, status_code = user_capsule_DELETE(request)

    return JsonResponse(result, safe=False, status=status_code)
