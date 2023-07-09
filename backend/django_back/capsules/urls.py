from rest_framework.decorators import api_view
from django.urls import path
from .views import story_create
urlpatterns = [
    path('<int:capsule_id>/stories', story_create)
]