# Generated by Django 3.1.5 on 2022-01-21 08:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payroll',
            name='allowance',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='payroll',
            name='basic_pay',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='payroll',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='payroll',
            name='last_increment',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='payroll',
            name='last_increment_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='payroll',
            name='last_salary_release_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
