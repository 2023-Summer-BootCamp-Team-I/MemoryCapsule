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


@api_view(['post'])
def sign_up(request):
    if request.method == 'POST':
        try:
            email_syntax_check(request.POST["email"])

            user = create_user(
                id=request.POST["id"],
                password=request.POST["password"],
                email=request.POST["email"],
                nickname=request.POST["nickname"],
                user_img_url=None
            )

            user_img_url = upload_image_for_api(request.FILES['img_file'])
            user.user_img_url = user_img_url
            # 유저 권한 : 0 == general, 1 == admin
            user.status = 0
            user.save()
            return JsonResponse({'code': '201', 'message': '회원 가입이 완료되었습니다', 'created_at': user.created_at}, status=201)
        except CustomException as e:
            error_response = {
                "error_code": e.error_code,
                "message": str(e)
            }
            return JsonResponse(error_response, status=400)
        except IntegrityError:
            user_id_confirm = User.objects.filter(id__icontains=request.POST["id"]).count()
            if user_id_confirm > 0:
                return JsonResponse({'code': '400', 'message': '이미 존재하는 아이디 입니다'}, status=400)

            user_email_confirm = User.objects.filter(email__icontains=request.POST["email"]).count()
            if user_email_confirm > 0:
                return JsonResponse({'code': '400', 'message': '이미 존재하는 이메일 입니다'}, status=400)


@api_view(['post'])
def sign_in(request):
    if request.method == 'POST':
        try:
            login_id_input = request.POST['id']
            login_password_input = request.POST['password']

            user = user_find_by_id(login_id_input)
            # 유저 입력 password와 db에 저장된 암호화 된 password 비교
            password_check_result = check_encrypted_password(login_password_input, user)

            user_data = {'user_id': user.id, 'user_nickname': user.nickname,
                         "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}

            if password_check_result:
                user_jwt_token = jwt.encode(user_data, JWT_SECRET_KEY, ALGORITHM)
                return JsonResponse({'message': '로그인이 완료되었습니다', 'jwt': user_jwt_token.decode('utf-8')}, status=200)
            else:
                return JsonResponse({'code': 401, 'message': '옳지 않은 비밀번호 입니다.'}, status=401)
        except User.DoesNotExist:
            return JsonResponse({'code': 401, 'message': '입력한 정보는 옳지 않은 정보입니다'}, status=401)