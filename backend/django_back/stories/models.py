from django.db import models
from baseapp.models import BaseModel
from users.models import User
from videos.models import Video
from capsules.models import Capsule


class Story(BaseModel):
    story_id = models.AutoField(primary_key=True)
    capsule_id = models.ForeignKey(Capsule, on_delete=models.CASCADE)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE)
    #video_id = models.ForeignKey(Video, on_delete=models.CASCADE)
    story_title = models.CharField(max_length=60)
    story_content = models.CharField(max_length=60)
    story_img_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'story'

class StoryVideo(models.Model):
    story_video_id = models.AutoField(primary_key=True)
    story_id = models.ForeignKey(Story, on_delete=models.CASCADE)
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)

    class Meta:
        db_table = 'story_video'
