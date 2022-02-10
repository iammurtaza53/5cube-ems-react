from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class PayrollSerializer(ModelSerializer):
    first_name = serializers.ReadOnlyField(source='employee.first_name')
    last_name = serializers.ReadOnlyField(source='employee.last_name')
    salary = serializers.ReadOnlyField(source='employee.salary')
    class Meta:
        model = Payroll
        fields = ('id','first_name','last_name','salary','basic_pay','allowance','last_increment',
                  'last_increment_date','last_salary_release_date')
        
    
    
  

