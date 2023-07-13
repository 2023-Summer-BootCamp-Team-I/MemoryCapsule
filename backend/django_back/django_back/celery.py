import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_back.settings')

app = Celery('backend', brocker='amqp://rabbitmq:5672')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()