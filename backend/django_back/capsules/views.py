import json
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

from .forms import PostForm
from .models import Capsule


# /api/v1/capsules/capsule_func/
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def capsule_func(request) -> json:
    result: json = "{}"
    status_code: int
    if request.method == 'GET':
        result, status_code = capsule_GET(request)

    elif request.method == 'POST':
        result, status_code = capsule_POST(request)

    elif request.method == 'PUT':
        capsule_GET(request)

    elif request.method == 'DELETE':
        capsule_GET(request)

    return JsonResponse(result, status=status_code)


def capsule_GET(request) -> (json, int):
    is_open: bool = request.GET['is_open']
    count: int = request.GET['count']
    capsules = Capsule.objects.all().order_by('due_date')
    data = []
    for capsule in capsules:
        capsule_data = {
            'capsule_id': capsule.capsule_id,
            'user_id': capsule.user_id,
            'theme_id': capsule.theme_id,
            'capsule_name': capsule.capsule_name,
            'due_date': capsule.due_date,
            'limit_count': capsule.limit_count,
            'capsule_img_url': capsule.capsule_img_url,
            'created_at': capsule.created_at,
        }
        data.append(capsule_data)


def capsule_POST(request) -> (json, int):
    val: json
    status_code: int
    form = PostForm(request.POST)

    if form.is_valid():
        form.save()
        status_code = 201
        val = {
            'code': 201,
            'message': 'capsule이 생성되었습니다',
            'capsule_name': form.cleaned_data['capsule_name'],
            'user_id': form.cleaned_data['user_id'],
            'theme_id': form.cleaned_data['theme_id'],
            'due_date': form.cleaned_data['due_date'],
            'limit_count': form.cleaned_data['limit_count'],
            'capsule_img_url': form.cleaned_data['capsule_img_url'],
        }

    else:
        status_code = 400
        val = {
            'code': 400,
            'message': '입력값에 오류가 있습니다. 다시 확인해 주세요.',
        }

    return val, status_code
