from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import Employee
from rest_framework.authtoken.models import Token

class EmployeeSerializer(ModelSerializer):
    # import pdb; pdb.set_trace()
    class Meta:
        model = Employee
        fields = '__all__'

# user authentication api        
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password':{'write_only':True, 'required':True}}
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user             
        
    # def create(self, validated_data):
    #     print("data:",validated_data)
    #     # import pdb; pdb.set_trace()
    #     # validated_data['profile_picture_path'] = 'images/' + str(validated_data['profile_picture_path']).split('\\')[-1]

    #     employee_data = Employee.objects.create(**validated_data)
    #     return employee_data
        
    