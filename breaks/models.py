from django.db import models
import uuid
from employee.models import Employee

# Create your models here.

class Breaks(models.Model):
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    employee = models.ForeignKey(Employee,blank=True,null=True,on_delete=models.CASCADE)
    reason = models.CharField(max_length=200,blank=True,null=True)
    start = models.CharField(max_length=200,blank=True,null=True)
    end = models.CharField(max_length=200,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__ (self):
        return str(self.employee.first_name)
    class Meta:
        verbose_name = "Breaks"