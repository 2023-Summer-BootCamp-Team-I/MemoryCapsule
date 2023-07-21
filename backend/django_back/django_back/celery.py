import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_back.settings')

app = Celery('backend', broker='amqp://guest:guest@rabbitmq:5672/')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


def revoke_task(task_id):
    app.control.revoke(task_id, terminate=True)
