from django.urls import path
from .views import video_work
urlpatterns = [
    path('<int:capsule_id>', video_work)
]