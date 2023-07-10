"""
URL configuration for django_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.conf import settings



schema_view = get_schema_view(
    openapi.Info(
        title="Memory capsule",  # 타이틀
        default_version='v1',   # 버전
        description="Memory capsule",   # 설명
        terms_of_service="https://google.com",
        contact=openapi.Contact(email="jaeyoon321@naver.com")
),
    validators=['flex'],
    public=True,
    permission_classes=(AllowAny,)
)

urlpatterns = [

    path('api/v1/admin/', admin.site.urls),
    path('api/v1/users/', include("users.urls")),
    path('api/v1/capsules/', include('capsules.urls')),
    path('api/v1/images/', include('images.urls')),
    path('api/v1/musics/', include('musics.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
        re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]
else:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
        re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0, url=settings.STATIC_URL + 'swagger.yaml'), name='schema-swagger-ui'),
        re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]