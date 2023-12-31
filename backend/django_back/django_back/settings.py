"""
Django settings for django_back project.

Generated by 'django-admin startproject' using Django 4.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import environ
import datetime
import logging
env = environ.Env()
env.read_env()
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'drf_yasg',
    'users.apps.UsersConfig',
    'capsules.apps.CapsulesConfig',
    'images.apps.ImagesConfig',
    'baseapp.apps.BaseappConfig',
    'musics.apps.MusicConfig',
    'videos.apps.VideosConfig',
    'stories.apps.StoriesConfig',
    'themes.apps.ThemesConfig',
    'storages',
    'django_celery_beat',
    'django_celery_results',
    'django_prometheus',
    'flower',
    # 'corsheaders',
]

MIDDLEWARE = [
    # Cors Header 반드시 최상단에 위치할 것!!
    # 'corsheaders.middleware.CorsMiddleware',
    # 'django.middleware.common.CommonMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_prometheus.middleware.PrometheusBeforeMiddleware',
    'django_prometheus.middleware.PrometheusAfterMiddleware',
]

ROOT_URLCONF = 'django_back.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_back.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DATABASE_NAME'),
        'USER': env('DATABASE_USER'),
        'PASSWORD': env('DATABASE_PASS'),
        'HOST': env('DATABASE_HOST'),
        'PORT': '3306',
        'OPTIONS': {
        'init_command' : "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}


JWT_SECRET_KEY = env('JWT_SECRET_KEY')
ALGORITHM = env('ALGORITHM')

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

GRAFANA = {
    'URL': 'http://grafana:3000',  # Grafana URL을 설정합니다. Docker Compose에서 사용한 이름으로 접근합니다.
    'API_KEY': env('GRAFANA_API_KEY'),  # Grafana API 키를 설정합니다. 본인의 API 키로 대체해야 합니다.
}

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

SWAGGER_SETTINGS = {
    'USE_SESSION_AUTH': False
}

#  AWS Setting 
AWS_REGION = env('AWS_REGION')  # AWS서버의 지역
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')  # 생성한 버킷 이름
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')  # 액서스 키 ID
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')  # 액서스 키 PW
AWS_DEFAULT_ACL = 'public-read'

AWS_S3_CUSTOM_DOMAIN = '%s.s3.%s.amazonaws.com' % (AWS_STORAGE_BUCKET_NAME, AWS_REGION)

STATIC_URL = 'static/'
# STATIC_URL = "https://%s/static/" % AWS_S3_CUSTOM_DOMAIN
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

MEDIA_URL = "https://%s/meida/" % AWS_S3_CUSTOM_DOMAIN
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CELERY_BROKER_URL = 'amqp://guest:guest@rabbitmq:5672/'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Asia/Seoul'
# Celery task를 종료 가능하게 해주는 세팅 (굉장히 중요)
CELERY_TASK_REVOKE = True
CELERY_RESULT_BACKEND = 'redis://redis:6379/0'

CELERYD_HIJACK_ROOT_LOGGER = False
CELERYD_REDIRECT_STDOUTS = False

DATA_UPLOAD_MAX_MEMORY_SIZE = int(1e10)

CELERY_FLOWER_USER = 'root'  # Flower 웹 인터페이스 사용자 이름
CELERY_FLOWER_PASSWORD = 'root'  # Flower 웹 인터페이스 비밀번호

logging.basicConfig(level=logging.DEBUG)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://redis:6379',
    }
}
#
# ##CORS
# CORS_ORIGIN_ALLOW_ALL = True  # <- 모든 호스트 허용
# CORS_ALLOW_CREDENTIALS = True  # <-쿠키가 cross-site HTTP 요청에 포함될 수 있다
#
# # <-실제 요청에 허용되는 HTTP 동사 리스트
# CORS_ALLOW_METHODS = (
#     'DELETE',
#     'GET',
#     'OPTIONS',
#     'PATCH',
#     'POST',
#     'PUT',
# )
#
# CORS_ALLOW_HEADERS = (
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrftoken',
#     'x-requested-with',
# )

APPEND_SLASH = False  # <- / 관련 에러 제거
