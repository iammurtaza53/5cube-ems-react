from django.core.signals import request_finished
from django.db.models.signals import post_save
from django.dispatch import receiver
from employee.models import Employee
from .models import Payroll


@receiver(post_save, sender=Employee)
def create_payroll(sender, instance, created, **kwargs):
    if created:
        Payroll.objects.create(employee=instance)


# @receiver(post_save, sender=Employee)
# def save_payroll(sender, instance, **kwargs):
#     instance.payroll.save()