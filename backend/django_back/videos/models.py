from django.db import models
from baseapp.models import BaseModel
from users.models import User
from capsules.models import Capsule
from musics.models import Music

class Video(BaseModel):
    video_id = models.AutoField(primary_key=True)
    capsule_id = models.ForeignKey(Capsule, on_delete=models.CASCADE)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE)
    music_id = models.ForeignKey(Music, on_delete=models.CASCADE)
    story_video_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'video'

