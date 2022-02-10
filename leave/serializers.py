from rest_framework.serializers import ModelSerializer
from .models import *
from employee.models import Employee
from rest_framework import serializers


class LeaveSerializer(ModelSerializer):
    
    first_name = serializers.ReadOnlyField(source='employee.first_name')
    last_name = serializers.ReadOnlyField(source='employee.last_name')
    designation = serializers.ReadOnlyField(source='employee.designation')
    
    class Meta:
        model = Leave
        fields =('id', 'employee', 'first_name','last_name', 'status', 'leave_type', 'to_date','designation', 'from_date', 'description', 'created_at')
   
    def update(self, instance, validated_data):
        # import pdb; pdb.set_trace()
        print(validated_data,"here i am")
        if len(validated_data) == 1: 
            instance.status = validated_data.get('status', instance.status)
            instance.save()
            return instance

class EmployeeDropdownSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields =  ("id","first_name","last_name","profile_picture_path")      

# class LeaveApproveSerializer()        