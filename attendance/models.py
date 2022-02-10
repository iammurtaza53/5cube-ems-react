from django.db import models
import uuid
from employee.models import *
# Create your models here.

class Attendance(models.Model):
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    employee = models.ForeignKey(Employee,on_delete=models.CASCADE,blank=True,null=True)
    status = models.CharField(max_length=300,null=True,blank=True)
    in_time = models.CharField(max_length=300,null=True,blank=True)
    out_time = models.CharField(max_length=300,null=True,blank=True)
    created_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return str(self.employee.first_name + " "+str(self.created_at))
