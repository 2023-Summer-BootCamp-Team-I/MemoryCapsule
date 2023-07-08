from rest_framework.decorators import api_view
from django.urls import path
from .views import capsule_func

urlpatterns = [
    path('', capsule_func)
]
