import os
from celery import Celery
from django.conf import settings
import logging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_back.settings')

app = Celery('backend', broker='amqp://guest:guest@rabbitmq:5672/')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.task_ack_late = True

app.log.setup_logging_subsystem()
logger = logging.getLogger('backend')
logger.setLevel(logging.DEBUG)

def revoke_task(task_id):
    app.control.revoke(task_id, terminate=True)
