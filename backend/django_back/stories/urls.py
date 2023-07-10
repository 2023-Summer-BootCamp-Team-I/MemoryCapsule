from rest_framework.decorators import api_view
from django.urls import path
from .views import story_detail, story_create,story_update

urlpatterns = [
    path('<int:capsule_id>', story_create),
    path('<int:capsule_id>/<int:story_id>', story_update)
]
