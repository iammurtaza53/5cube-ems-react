

from django.db import models
import uuid
from employee.models import Employee

# Create your models here.
class Leave(models.Model):
 
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    employee = models.ForeignKey(Employee,blank=True,null=True,on_delete=models.CASCADE)
    status = models.CharField(default='pending',max_length=50)
    leave_type = models.CharField(max_length=100,blank=True,null=True)
    to_date = models.DateField(blank=True,null=True)
    from_date = models.DateField(blank=True,null=True)
    description = models.TextField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__ (self):
        return str(self.employee.first_name)
    class Meta:
        verbose_name = "Leave"