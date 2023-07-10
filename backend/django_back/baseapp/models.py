from django.db import models
from django.utils import timezone


class KoreanDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        if not getattr(model_instance, self.attname):
            value = timezone.localtime()
            setattr(model_instance, self.attname, value)
            return value
        return super().pre_save(model_instance, add)


class BaseModel(models.Model):
    created_at = KoreanDateTimeField(auto_now_add=True, blank=True)
    updated_at = KoreanDateTimeField(auto_now=True, blank=True)
    deleted_at = models.DateTimeField(null=True, default=None, blank=True)

    class Meta:
        abstract = True
