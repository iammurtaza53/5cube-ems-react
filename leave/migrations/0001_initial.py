# Generated by Django 3.1.5 on 2022-01-18 07:00

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employee', '0006_auto_20220118_1200'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leave',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('status', models.CharField(blank=True, max_length=50, null=True)),
                ('leave_type', models.CharField(blank=True, max_length=100, null=True)),
                ('to_date', models.DateField(blank=True, null=True)),
                ('from_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('employee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
            options={
                'verbose_name': 'Leave',
            },
        ),
    ]
