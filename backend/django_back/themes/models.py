from django.db import models
from baseapp.models import BaseModel
class Theme(BaseModel):
    theme_id = models.AutoField(primary_key=True)
    theme_name = models.CharField(max_length=60)
    theme_img_url = models.CharField(max_length=255)

    class Meta:
        db_table = 'theme'