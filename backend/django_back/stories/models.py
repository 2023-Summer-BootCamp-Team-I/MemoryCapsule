from django.db import models
from baseapp.models import BaseModel
from users.models import User
from videos.models import Video
from capsules.models import Capsule

class Story(BaseModel):
    story_id = models.AutoField(primary_key=True)
    capsule = models.ForeignKey(Capsule, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    story_title = models.CharField(max_length=60)
    story_content = models.CharField(max_length=60)
    story_img_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'story'

class StoryVideo(BaseModel):
    story_video_id = models.AutoField(primary_key=True)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    class Meta:
        db_table = 'story_video'
