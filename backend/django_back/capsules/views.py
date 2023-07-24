import json
from django.http import JsonResponse
from .utils import *
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    methods=['GET'],
    tags=["Capsule 전체 조회"],
    manual_parameters=[
        openapi.Parameter(
            name="jwt_token",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="jwt token 입력",
        ),
        openapi.Parameter(
            name="is_open",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="캡슐이 열렸는지 체크",
        ),
        openapi.Parameter(
            name="count",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="가져올 캡슐 개수. -1을 입력 시, 모든 캡슐 반환 ",
        ),
    ]
)
@swagger_auto_schema(
    methods=['POST'],
    tags=["Capsule 생성"],
    consumes=['multipart/form-data'],
    manual_parameters=[
        openapi.Parameter(
            name="jwt_token",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="jwt token 입력",
        ),
        openapi.Parameter(
            name="theme_id",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_INTEGER,
            description="테마 아이디",
        ),
        openapi.Parameter(
            name="capsule_name",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="캡슐 이름",
        ),
        openapi.Parameter(
            name="due_date",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            format=openapi.FORMAT_DATETIME,
            description="캡슐 개봉일 Due Date",
        ),
        openapi.Parameter(
            name="limit_count",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_INTEGER,
            description="영상에 사용할 이미지 개수 제한",
        ),
        openapi.Parameter(
            name="capsule_password",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="캡슐 비밀번호",
        ),
        openapi.Parameter(
            name="img_file",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="캡슐 이미지 파일",
        ),

    ]
)
# /api/v1/capsules/capsule_func/
@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
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
