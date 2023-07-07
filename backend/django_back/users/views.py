from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from django.http import HttpResponse

@api_view(['get'])
def hello(request):
    return HttpResponse("ggd")
