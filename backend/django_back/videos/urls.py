from django.urls import path
from .views import video
urlpatterns = [
    path('<int:capsule_id>', video)
]