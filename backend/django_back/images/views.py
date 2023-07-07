from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse
# Create your views here.
@api_view(['post'])
def upload_image(request):
    return HttpResponse("gd")