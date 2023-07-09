from rest_framework.decorators import api_view
from django.urls import path
from .views import sign_up, sign_in, video

urlpatterns = [
    path('sign-up', sign_up),
    path('sign-in', sign_in),
    path('video', video),
]