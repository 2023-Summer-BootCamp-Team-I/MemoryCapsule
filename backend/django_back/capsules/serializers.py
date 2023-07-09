from rest_framework import serializers
from .models import Story

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ["capsule_id", "story_title", "story_content", "story_img_url", "creator_id"]