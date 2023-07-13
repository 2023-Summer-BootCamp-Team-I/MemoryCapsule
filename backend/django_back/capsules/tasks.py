from celery import shared_task

from django_back.celery import app

# api1 재호출 시 필요한 함수 -> update
@shared_task
def api1_update():
    func1_update()