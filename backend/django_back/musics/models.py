from django.db import models
from baseapp.models import BaseModel
class Music(BaseModel):
    music_id = models.AutoField(primary_key=True)
    music_name = models.CharField(max_length=60)
    music_context = models.CharField(max_length=255)
    music_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'music'