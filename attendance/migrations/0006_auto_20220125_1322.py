# Generated by Django 3.1.5 on 2022-01-25 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0005_auto_20220125_1320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
