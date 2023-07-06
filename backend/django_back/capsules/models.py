from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
from django.db import models

from baseapp.models import BaseModel
from users.models import User


class Capsule(BaseModel):
    capsule_id = models.AutoField(primary_key=True)
    user_id = models.ManyToManyField(User, db_column='user_id', through='UserCapsule')
    theme_id = models.ForeignKey('Theme', on_delete=models.CASCADE, db_column='user_id')
    capsule_name = models.CharField(max_length=60)
    due_date = models.DateTimeField()
    limit_count = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(30)])
    capsule_img_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'capsule'

class Theme(BaseModel):
    theme_id = models.AutoField(primary_key=True)
    theme_name = models.CharField(max_length=60)
    theme_img_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'theme'

class UserCapsule(models.Model):
    user_capsule_id = models.AutoField(primary_key=True)
    capsule_id = models.ForeignKey(Capsule, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'user_capsule'

class Story(BaseModel):
    story_id = models.AutoField(primary_key=True)
    capsule_id = models.ForeignKey(Capsule, on_delete=models.CASCADE)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.ManyToManyField('Video', through='StoryVideo')
    story_title = models.CharField(max_length=60)
    story_content = models.CharField(max_length=60)
    story_img_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'story'

class Video(BaseModel):
    video_id = models.AutoField(primary_key=True)
    capsule_id = models.ForeignKey(Capsule, on_delete=models.CASCADE)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE)
    music_id = models.ForeignKey('Music', on_delete=models.CASCADE)
    story_video_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'video'


class StoryVideo(models.Model):
    story_video_id = models.AutoField(primary_key=True)
    story_id = models.ForeignKey(Story, on_delete=models.CASCADE)
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)

    class Meta:
        db_table = 'story_video'

class Music(BaseModel):
    music_id = models.AutoField(primary_key=True)
    music_name = models.CharField(max_length=60)
    music_context = models.CharField(max_length=255)
    music_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'music'