from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

from django.db import models

from baseapp.models import BaseModel


class User(BaseModel):
    user_id = models.AutoField(primary_key=True)
    id = models.CharField(max_length=60)
    password = models.CharField(max_length=60)
    email = models.CharField(unique=True, max_length=200, null=True, blank=True)
    nickname = models.CharField(max_length=60)
    status = models.IntegerField(default=0)
    user_img_url = models.CharField(max_length=255)


    class Meta:
        db_table = 'user'