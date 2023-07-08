from rest_framework import serializers
from .models import Capsule

class CapsuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capsule
        fields = ('user_id', 'theme_id', 'capsule_name', 'due_date', 'limit_count')
