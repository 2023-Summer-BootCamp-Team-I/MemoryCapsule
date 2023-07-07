from rest_framework.decorators import api_view
from django.urls import path
from .views import hello

urlpatterns = [
    path('test', hello)
]