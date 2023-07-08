# Generated by Django 4.2.3 on 2023-07-08 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capsules', '0003_alter_capsule_table_alter_story_table_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='story',
            name='capsule_id',
        ),
        migrations.RemoveField(
            model_name='story',
            name='creator_id',
        ),
        migrations.RemoveField(
            model_name='story',
            name='video_id',
        ),
        migrations.RemoveField(
            model_name='storyvideo',
            name='story_id',
        ),
        migrations.RemoveField(
            model_name='storyvideo',
            name='video_id',
        ),
        migrations.RemoveField(
            model_name='usercapsule',
            name='capsule_id',
        ),
        migrations.RemoveField(
            model_name='usercapsule',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='video',
            name='capsule_id',
        ),
        migrations.RemoveField(
            model_name='video',
            name='creator_id',
        ),
        migrations.RemoveField(
            model_name='video',
            name='music_id',
        ),
        migrations.AlterField(
            model_name='capsule',
            name='theme_id',
            field=models.IntegerField(null=True),
        ),
        migrations.RemoveField(
            model_name='capsule',
            name='user_id',
        ),
        migrations.DeleteModel(
            name='Music',
        ),
        migrations.DeleteModel(
            name='Story',
        ),
        migrations.DeleteModel(
            name='StoryVideo',
        ),
        migrations.DeleteModel(
            name='Theme',
        ),
        migrations.DeleteModel(
            name='UserCapsule',
        ),
        migrations.DeleteModel(
            name='Video',
        ),
        migrations.AddField(
            model_name='capsule',
            name='user_id',
            field=models.IntegerField(null=True),
        ),
    ]