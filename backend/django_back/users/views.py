import jwt
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from .models import User
from .utils import create_user, user_find_by_id, check_encrypted_password
from django.db import IntegrityError
from django_back.settings import JWT_SECRET_KEY, ALGORITHM
from images.views import upload_image_for_api
from .exceptions import CustomException, email_syntax_check

import datetime
from rest_framework.decorators import api_view, parser_classes

from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.parsers import JSONParser


@swagger_auto_schema(
    methods=['POST'],
    operation_summary="User 생성",
    consumes=['multipart/form-data'],
    manual_parameters=[
        openapi.Parameter(
            name="id",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="id 입력",
        ),
        openapi.Parameter(
            name="password",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="패스워드 입력",
        ),

        openapi.Parameter(
            name="phone_number",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="전화번호 입력",
        ),
        openapi.Parameter(
            name="email",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="이메일 입력",
        ),

        openapi.Parameter(
            name="nickname",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="닉네임 입력",
        ),

        openapi.Parameter(
            name="img_file",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="유저 사진 추가",
        ),

    ]
)
@api_view(['post'])
@parser_classes([MultiPartParser, FormParser])
def sign_up(request):
    if request.method == 'POST':
        try:
            if 'img_file' not in request.FILES:
                return JsonResponse({'code': 400, 'message': '이미지가 제공되지 않았습니다.'}, status=400)

            if not request.POST.get("id"):
                return JsonResponse({'code': '400', 'message': '아이디는 필수 항목입니다.'}, status=400)

            if not request.POST.get("password"):
                return JsonResponse({'code': '400', 'message': '비밀번호는 필수 항목입니다.'}, status=400)

            if not request.POST.get("email"):
                return JsonResponse({'code': '400', 'message': '이메일은 필수 항목입니다.'}, status=400)

            if not request.POST.get("phone_number"):
                return JsonResponse({'code': '400', 'message': '전화번호는 필수 항목입니다.'}, status=400)

            if not request.POST.get("nickname"):
                return JsonResponse({'code': '400', 'message': '닉네임은 필수 항목입니다.'}, status=400)

            email_syntax_check(request.data["email"])

            user = create_user(
                id=request.data["id"],
                password=request.data["password"],
                phone_number=request.data["phone_number"],
                email=request.data["email"],
                nickname=request.data["nickname"],
                user_img_url=None
            )

            user_img_url = upload_image_for_api(request.FILES['img_file'])
            user.user_img_url = user_img_url
            # user.user_img_url = request.data['img_file']

            # 유저 권한 : 0 == general, 1 == admin
            user.status = 0
            user.save()
            return JsonResponse({'code': '201', 'message': '회원 가입이 완료되었습니다', 'created_at': user.created_at}, status=201)
        except IntegrityError:
            if User.objects.filter(id=request.data["id"]).exists():
                return JsonResponse({'code': '400', 'message': '이미 존재하는 아이디 입니다'}, status=400)

            if User.objects.filter(email=request.data["email"]).exists():
                return JsonResponse({'code': '400', 'message': '이미 존재하는 이메일 입니다'}, status=400)

            if User.objects.filter(phone_number=request.data["phone_number"]).exists():
                return JsonResponse({'code': '400', 'message': '이미 존재하는 전화번호 입니다'}, status=400)

            return JsonResponse({'code': '400', 'message': 'Unexpected error occurred'}, status=400)
        except Exception as e:
            JsonResponse({"message" : "에러 확인 불가"})

@swagger_auto_schema(
    method='post',
    operation_summary="User 로그인",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'id': openapi.Schema(type=openapi.TYPE_STRING, description='아이디 입력'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='비밀번호 입력'),
        }
    )
)
@api_view(['post'])
@parser_classes([MultiPartParser, JSONParser])
def sign_in(request):
    if request.method == 'POST':
        try:
            login_id_input = request.data['id']
            login_password_input = request.data['password']

            user = user_find_by_id(login_id_input)
            # 유저 입력 password와 db에 저장된 암호화 된 password 비교
            password_check_result = check_encrypted_password(login_password_input, user)

            if password_check_result:
                user_token_data = {"user_id": str(user.user_id), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}
                user_jwt_token = jwt.encode(user_token_data, JWT_SECRET_KEY, ALGORITHM)
                data = {
                    'nickname': user.nickname,
                    'user_img_url': user.user_img_url
                }
                return JsonResponse({'message': '로그인이 완료되었습니다', 'jwt_token': user_jwt_token.decode('utf-8'), 'data': data}, status=200)
            else:
                return JsonResponse({'code': 401, 'message': '옳지 않은 비밀번호 입니다.'}, status=401)
        except User.DoesNotExist:
            return JsonResponse({'code': 401, 'message': '입력한 정보는 옳지 않은 정보입니다'}, status=401)
