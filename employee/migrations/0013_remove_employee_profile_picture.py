# Generated by Django 3.1.5 on 2022-01-24 06:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0012_employee_profile_picture_path'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='profile_picture',
        ),
    ]
