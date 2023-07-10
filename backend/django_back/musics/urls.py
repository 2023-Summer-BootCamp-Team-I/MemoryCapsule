from rest_framework.decorators import api_view
from django.urls import path
from .views import upload_mp3

urlpatterns = [
    path('', upload_mp3)
]