from django.db import models
import uuid

# Create your models here.
class Employee(models.Model):
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    first_name = models.CharField(max_length=50,blank=True,null=True)
    last_name = models.CharField(max_length=50,blank=True,null=True)
    email = models.EmailField(blank=True,null=True)
    password = models.CharField(max_length=500,blank=True,null=True)
    designation = models.CharField(max_length=500,blank=True,null=True)
    cnic = models.CharField(max_length=50,blank=True,null=True)
    address = models.TextField(blank=True,null=True)
    contact = models.CharField(max_length=50,blank=True,null=True)
    # profile_picture = models.ImageField(blank=True,null=True,default='profile_picture.png')
    profile_picture_path = models.ImageField(blank=True,null=True,default='profile_picture.png')
    joining_date = models.DateField(blank=True,null=True)
    created =  models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=200,blank=True,null=True)
    salary = models.CharField(max_length=5000,blank=True,null=True)
    
    def __str__(self):
        return self.first_name
    
    class Meta:
        verbose_name = 'Employee'