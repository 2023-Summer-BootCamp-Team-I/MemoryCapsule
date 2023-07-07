from rest_framework.decorators import api_view
from django.urls import path
from .views import test

urlpatterns = [
    path('test', test)
]