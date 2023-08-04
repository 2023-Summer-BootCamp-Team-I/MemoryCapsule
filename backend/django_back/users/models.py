from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

from django.db import models
from baseapp.models import BaseModel
import uuid


class User(BaseModel):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, null=False, blank=False)
    id = models.CharField(unique=True, max_length=60, null=False, blank=False)
    password = models.CharField(max_length=80, null=False, blank=False)
    phone_number = models.CharField(unique=True, max_length=13, null=False, blank=False)
    email = models.CharField(unique=True, max_length=200, null=False, blank=False)
    nickname = models.CharField(max_length=60, null=False, blank=False)
    status = models.IntegerField(default=0)
    user_img_url = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'user'