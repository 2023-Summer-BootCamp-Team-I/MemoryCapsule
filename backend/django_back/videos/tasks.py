from celery import shared_task
from .utils import user_choice_video_maker

@shared_task
def create_user_choice_video(capsule_id, music_id, user_choice_list, user_id):
    # video_count = Video.objects.filter(capsule=capsule_id).count() + 1
    # music_url = music.music_url
    return user_choice_video_maker(capsule_id, music_id, user_choice_list, user_id)