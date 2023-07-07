from rest_framework.decorators import api_view
from django.urls import path
from .views import upload_image

urlpatterns = [
    path('', upload_image)
]