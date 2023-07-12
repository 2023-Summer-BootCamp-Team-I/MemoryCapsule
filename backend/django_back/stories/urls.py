from rest_framework.decorators import api_view
from django.urls import path
from .views import story_func, story_capsule_func #story_list_GET

urlpatterns = [
    path('<int:capsule_id>', story_capsule_func),
    path('<int:capsule_id>/<int:story_id>', story_func),
    #path('<int:capsule_id>/<int:story_id>', story_update),
    #path('<int:capsule_id>/<int:story_id>', story_delete)

]
