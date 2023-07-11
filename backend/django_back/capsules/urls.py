from rest_framework.decorators import api_view
from django.urls import path
from .views import capsule_func
from .views import capsule_url_parm_func
from .views import user_capsule_func

# http://0.0.0.0:8080/api/v1/capsules/
urlpatterns = [
    path('', capsule_func),
    path('<int:capsule_id>', capsule_url_parm_func),
    path('users', user_capsule_func)
]
