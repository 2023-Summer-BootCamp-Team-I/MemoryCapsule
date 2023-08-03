import logging
from videos.utils import default_video_maker
from themes.models import Theme
import pytz
from datetime import datetime


def schedule_video_creation(capsule, due_date):
    target_datetime = due_date  # due_date 값을 사용하여 원하는 날짜 및 시간 설정

    # 로깅 설정
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

    # 로그 남기기
    logger.info(f'Starting video creation for capsule {capsule.capsule_id} at {due_date}')

    utc_datetime = due_date.astimezone(pytz.utc)

    # 작업 실행
    task = default_video_maker.apply_async(args=[capsule.capsule_id, capsule.theme.music_id], eta=utc_datetime)

    return task.id
