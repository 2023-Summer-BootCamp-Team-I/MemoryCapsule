from rest_framework import serializers
from .models import Capsule

class CapsuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capsule
        fields = ('capsule_id', 'creator_id', 'theme_id', 'capsule_name', 'due_date', 'limit_count', 'created_at')

    def __init__(self, instance=None, *args, **kwargs):
        kwargs['instance'] = instance
        super().__init__(*args, **kwargs)



