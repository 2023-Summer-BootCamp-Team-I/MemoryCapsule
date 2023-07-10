from rest_framework.decorators import api_view
from django.urls import path
from .views import capsule_func
from .views import capsule_parm_func

urlpatterns = [
    path('', capsule_func),
    path('<int:capsule_id>/', capsule_parm_func)
]
