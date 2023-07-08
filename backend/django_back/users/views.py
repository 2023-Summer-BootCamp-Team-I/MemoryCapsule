import jwt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import User
from .utils import create_user, user_find_by_id, check_encrypted_password
from django.db import IntegrityError
from django_back.settings import JWT_SECRET_KEY, ALGORITHM

import datetime


@api_view(['post'])
def sign_up(request):
    if request.method == 'POST':
        try:
            user = create_user(
                request.POST["id"],
                request.POST["password"],
                request.POST["email"],
                request.POST["nickname"],
                request.POST["image"]
            )

            # 유저 권한 : 0 == general, 1 == admin
            user.status = 0
            return JsonResponse({'code': '201', 'message': '회원 가입이 완료되었습니다'}, status=201)
        except IntegrityError:
            users = User.objects.all()
            for user in users:
                if request.POST["id"] == user.id:
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 아이디 입니다'}, status=500)
                elif check_encrypted_password(request.POST["password"], user):
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 비밀번호 입니다'}, status=500)
                elif request.POST["email"] == user.email:
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 이메일 입니다'}, status=500)


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
                return JsonResponse({'message': '옳지 않은 비밀번호 입니다.'}, status=500)
        except User.DoesNotExist:
            return JsonResponse({'message': '입력한 정보는 옳지 않은 정보입니다'}, status=500)
