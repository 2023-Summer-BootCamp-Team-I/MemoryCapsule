from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse
# Create your views here.
@api_view(['get'])
def test(request):
    # 유재윤 세팅용으로 만져 놨습니다
    return HttpResponse("gd")