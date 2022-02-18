from rest_framework.serializers import ModelSerializer
from .models import *
from employee.models import Employee
from rest_framework import serializers


class BreakSerializer(ModelSerializer):
    
    first_name = serializers.ReadOnlyField(source='employee.first_name')
    last_name = serializers.ReadOnlyField(source='employee.last_name')
    
    
    class Meta:
        model = Breaks
        fields =('id', 'employee', 'first_name','last_name','reason','start','end', 'created_at')
   
    # def update(self, instance, validated_data):
    #     # import pdb; pdb.set_trace()
    #     print(validated_data,"here i am")
    #     if len(validated_data) == 1: 
    #         instance.end = validated_data.get('end', instance.end)
    #         instance.save()
    #         return instance

# class EmployeeDropdownSerializer(ModelSerializer):
#     class Meta:
#         model = Employee
#         fields =  ("id","first_name","last_name","profile_picture_path")      

# class LeaveApproveSerializer()        