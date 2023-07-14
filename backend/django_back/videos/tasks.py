from celery import shared_task
from .utils import user_choice_video_maker
from videos.models import Video
@shared_task
def create_user_choice_video(capsule, music, user_choice_list):
    video_count = Video.objects.filter(capsule=capsule.capsule_id).count() + 1
    music_url = music.music_url
    return user_choice_video_maker(capsule.capsule_id, video_count, user_choice_list, music_url)