import jwt
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponse
from .models import User
from .utils import create_user, user_find_by_id, check_encrypted_password
from django.db import IntegrityError
from django_back.settings import JWT_SECRET_KEY, ALGORITHM

import datetime


@api_view(['get', 'post'])
def sign_up(request):
    if request.method == 'GET':
        user = User.objects.get(user_id=1)
        print(user.email)
        return JsonResponse({'message': user.email}, status=201)
    if request.method == 'POST':
        try:
            user = create_user(
                request.POST["id"],
                request.POST["password"],
                request.POST["email"],
                request.POST["nickname"],
                request.POST["image"]
            )
            user.status = 0
            return JsonResponse({'code': '201', 'message': '회원 가입이 완료되었습니다'}, status=201)
        except IntegrityError:
            users = User.objects.all()
            for user in users:
                if request.POST["id"] == user.id:
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 아이디 입니다'}, status=500)
                elif request.POST["email"] == user.email:
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 이메일 입니다'}, status=500)


@api_view(['post'])
def sign_in(request):
    if request.method == 'POST':
        try:
            login_id_input = request.POST['id']
            login_password_input = request.POST['password']

            user = user_find_by_id(login_id_input)
            check_encrypted_password(login_password_input, user)

            user_data = {'user_id': user.id, 'user_nickname': user.nickname, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}

            if check_encrypted_password:
                user_jwt_token = jwt.encode(user_data, JWT_SECRET_KEY, ALGORITHM)
                return JsonResponse({'message': '로그인이 완료되었습니다', 'jwt': user_jwt_token.decode('utf-8')})
            else:
                return JsonResponse({'message': '존재하지 않는 계정입니다'})
        except User.DoesNotExist:
            return JsonResponse({'message': '존재하지 않는 계정입니다'})

