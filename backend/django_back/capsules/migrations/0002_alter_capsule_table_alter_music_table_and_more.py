# Generated by Django 4.2.1 on 2023-07-06 15:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('capsules', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='capsule',
            table='Capsule',
        ),
        migrations.AlterModelTable(
            name='music',
            table='music',
        ),
        migrations.AlterModelTable(
            name='story',
            table='Story',
        ),
        migrations.AlterModelTable(
            name='storyvideo',
            table='Story_Video',
        ),
        migrations.AlterModelTable(
            name='theme',
            table='Theme',
        ),
        migrations.AlterModelTable(
            name='usercapsule',
            table='User_Capsule',
        ),
        migrations.AlterModelTable(
            name='video',
            table='Video',
        ),
    ]