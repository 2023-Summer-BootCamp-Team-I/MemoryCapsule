from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponse
from .models import User
from .utils import createUser
from django.db import IntegrityError

import datetime


@api_view(['get', 'post'])
def signUp(request):
    if request.method == 'GET':
        user = User.objects.get(user_id=1)
        print(user.email)
        return JsonResponse({'message':user.email}, status=201)
    if request.method == 'POST':
        try:
            user = createUser(
                request.POST["id"],
                request.POST["password"],
                request.POST["email"],
                request.POST["nickname"],
                request.POST["image"]
            )
            user.status = 0
            return JsonResponse({'code':'201', 'message':'회원 가입이 완료되었습니다'}, status=201)
        except IntegrityError:
            users = User.objects.all()

            for user in users:
                if request.POST["id"] == user.id:
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 아이디 입니다'}, status=500)
                elif request.POST["password"] == user.password:
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 비밀번호 입니다'}, status=500)
                elif request.POST["email"] == user.email:
                    return JsonResponse({'code': '500', 'message': '이미 존재하는 이메일 입니다'}, status=500)

