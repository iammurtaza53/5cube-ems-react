from django.db import models
from employee.models import Employee
import uuid


# Create your models here.
class Payroll (models.Model):
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    employee = models.OneToOneField(Employee,on_delete=models.CASCADE,blank=True,null=True)
    basic_pay = models.CharField(max_length=300,blank=True,null=True)
    allowance = models.CharField(max_length=300,blank=True,null=True)
    last_increment = models.CharField(max_length=300,blank=True,null=True)
    last_increment_date = models.DateField(blank=True,null=True)
    last_salary_release_date = models.DateField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
   
    
    def __str__(self):
        return str(self.employee.first_name)
    
    class Meta:
        managed = True