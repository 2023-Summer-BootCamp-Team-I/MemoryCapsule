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
        # capsule_GET(request)
        result = {"a": "a"}

    elif request.method == 'POST':
        result, status_code = capsule_POST(request)

    elif request.method == 'PUT':
        capsule_GET(request)

    elif request.method == 'DELETE':
        capsule_GET(request)

    return JsonResponse(result, status=status_code)


def capsule_GET(request):
    is_open: bool = request.GET['is_open']
    count: int = request.GET['count']


def capsule_POST(request) -> (json, int):
    val: json = {'error': 'error'}
    form = PostForm(request.POST)
    if form.is_valid():
        form.save()

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

    return val, 201
