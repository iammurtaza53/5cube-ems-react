# Generated by Django 3.1.5 on 2022-01-18 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_employee_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='employee',
            options={'verbose_name': 'Employee'},
        ),
        migrations.AddField(
            model_name='employee',
            name='salary',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
    ]
