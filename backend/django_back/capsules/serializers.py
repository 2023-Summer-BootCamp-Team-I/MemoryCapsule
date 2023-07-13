from rest_framework import serializers
from .models import Capsule
from .models import UserCapsule
from users.models import User
from themes.models import Theme


class CapsuleSerializer(serializers.ModelSerializer):
    creator_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='creator')
    theme_id = serializers.PrimaryKeyRelatedField(queryset=Theme.objects.all(), source='theme')

    class Meta:
        model = Capsule
        fields = ('capsule_id', 'creator_id', 'theme_id', 'capsule_name',
                  'due_date', 'limit_count','created_at',)

    def __init__(self, instance=None, *args, **kwargs):
        kwargs['instance'] = instance
        super().__init__(*args, **kwargs)


class UserCapsuleSerializer(serializers.ModelSerializer):
    capsule_id = serializers.PrimaryKeyRelatedField(queryset=Capsule.objects.all())
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = UserCapsule
        fields = ('capsule_id', 'user_id')

    def create(self, validated_data):
        return UserCapsule.objects.create(**validated_data)

