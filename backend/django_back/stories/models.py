from django.db import models
from baseapp.models import BaseModel
from users.models import User
from videos.models import Video
# Create your models here.
class Story(BaseModel):
    story_id = models.AutoField(primary_key=True)
    capsule_id = models.ForeignKey('Capsule', on_delete=models.CASCADE)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.ManyToManyField(Video, through='StoryVideo')
    story_title = models.CharField(max_length=60)
    story_content = models.CharField(max_length=60)
    story_img_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'story'
