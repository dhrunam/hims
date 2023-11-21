from dataclasses import fields
import imp
from pyexpat import model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.db import transaction, connection
from hims.configuration  import models
from django.contrib.auth.models import (User, Group)

from hims.account import models as acc_models

from hims.configuration.serializers import (
    DesignationSerializer,
    ProprietorSerializer,
    HotelSerializer,
    DepartmentMasterSerializer,

)


class UserGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group

        fields = [
            'id',
            'name',

        ]


class UserProfileSerializer(serializers.ModelSerializer):
    related_designation = DesignationSerializer(
        source='designation', read_only=True)
    related_department = DepartmentMasterSerializer(
        source='department', read_only=True)
    related_proprietor = ProprietorSerializer(source='proprietor', read_only=True)
    related_hotel = ProprietorSerializer(source='hotel', read_only=True)

    class Meta:
        model = acc_models.UserProfile

    # user=models.ForeignKey(User,on_delete=models.CASCADE)
    # designation=models.ForeignKey(Designation,on_delete=models.CASCADE)
    # office=models.ForeignKey(Office,on_delete=models.CASCADE)
    # first_name=models.CharField(max_length=128,blank=False)
    # middle_name=models.CharField(max_length=128,blank=True, default='')
    # last_name=models.CharField(max_length=128,blank=True, default='')
    # contact_number=models.CharField(max_length=12)
    # created_at=models.DateTimeField(auto_now_add=True)
    # updated_at=models.DateTimeField(auto_now_add=True)

        fields = [
            'id',
            'user',
            'designation',
            'proprietor',
            'hotel',
            'contact_number',
            'created_at',
            'updated_at',
            'related_designation',
            'related_proprietor',
            'related_hotel',
            'related_department',

        ]


class ResgisteredUserSerializer(serializers.ModelSerializer):
    related_profile = UserProfileSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'related_profile',

        ]



class RegisterSerializer(serializers.ModelSerializer):
    related_profile = UserProfileSerializer(many=True, read_only=True)
    related_groups = UserGroupSerializer(
        source='groups',  many=True, read_only=True)
    email = serializers.EmailField(
        required=False,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(max_length=128)
    last_name = serializers.CharField(max_length=128)
    department = serializers.IntegerField(write_only=True, required=True)
    designation = serializers.IntegerField(write_only=True, required=False)
    email = serializers.EmailField(write_only=True, required=False)
    proprietor = serializers.IntegerField(write_only=True, required=False)
    hotel = serializers.IntegerField(write_only=True, required=True)
    contact_number = serializers.CharField(write_only=True, max_length=12, required=False)
    is_staff = serializers.BooleanField(default=False)
    group = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password', 'password2',
            'email',
            'first_name',
            'last_name',
            'designation',
            'department',
            'proprietor',
            'hotel',
            'is_staff',
            'group',
            'contact_number',
            'related_groups',
            'related_profile',
        ]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'department': {'required': True},
            'proprietor': {'required': False},
            'hotel': {'required': True},
            'contact_number': {'required': True},
            'group': {'required': True}
        }

    def validate(self, attrs):
        if 'password' in attrs:
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError(
                    {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):

        try:
            with transaction.atomic():
                user = User.objects.create(
                    username=validated_data['username'],
                    email=validated_data['email'],
                    first_name=validated_data['first_name'],
                    last_name=validated_data['last_name'],
                    is_staff=True if validated_data['group'] == 'user' else False,
                )
                user.groups.add(Group.objects.get(
                    id=validated_data['group']))
                user.set_password(validated_data['password'])
                user.save()
                user_profile = acc_models.UserProfile.objects.update_or_create(
                    user=user,
                    defaults={
                        "department": acc_models.DepartmentMaster.objects.get(pk=validated_data['department']),
                        # "proprietor": acc_models.Office.objects.get(pk=validated_data['proprietor']),
                        "hotel": acc_models.Hotel.objects.get(pk=validated_data['hotel']),
                        "contact_number": validated_data['contact_number']
                    }

                )
                # data = {
                #         'username':user.username,
                #         'email':user.email,
                #         'first_name': user.first_name,
                #         'last_name':user.last.name
                #         }
                return user

                # return Response(serializers.data(), status=status.HTTP_200_OK)

        except TypeError:
            return TypeError("There is some error in processing your data.")

    def update(self, instance, validated_data):
        print('Update is calling...')
        try:
            with transaction.atomic():
                user = instance

                user.username = validated_data.get('username',user.username)
                user.email = validated_data.get('email',user.email)
                user.first_name = validated_data.get('first_name',user.first_name)
                user.last_name = validated_data.get('last_name',user.last_name)
                
                password = validated_data.get('password',None)
                if password:

                    user.set_password(validated_data['password'])
                
                group = validated_data.get('group','')
                if(group!=''):
                    user.is_staff = True if validated_data['group'] == 'user' else False
                    user.groups.clear();
                    user.groups.add(Group.objects.get(
                        id=validated_data['group']))
                user.save()

                department = validated_data.get('department', None)
                hotel = validated_data.get('hotel', None)
                contact_number = validated_data.get('contact_number', None)

                if department:
                    user_profile = acc_models.UserProfile.objects.update_or_create(
                        user=user,
                        defaults={
                            "department": acc_models.DepartmentMaster.objects.get(pk=validated_data['department']),
                            # "proprietor": acc_models.Office.objects.get(pk=validated_data['proprietor']),
                            # "hotel": acc_models.Hotel.objects.get(pk=validated_data['hotel']),
                            # "contact_number": validated_data['contact_number']
                        }

                    )
                if hotel:
                    user_profile = acc_models.UserProfile.objects.update_or_create(
                        user=user,
                        defaults={
                            # "department": acc_models.DepartmentMaster.objects.get(pk=validated_data['department']),
                            # "proprietor": acc_models.Office.objects.get(pk=validated_data['proprietor']),
                            "hotel": acc_models.Hotel.objects.get(pk=validated_data['hotel']),
                            # "contact_number": validated_data['contact_number']
                        }

                    )

                if contact_number:
                    user_profile = acc_models.UserProfile.objects.update_or_create(
                        user=user,
                        defaults={
                            # "department": acc_models.DepartmentMaster.objects.get(pk=validated_data['department']),
                            # "proprietor": acc_models.Office.objects.get(pk=validated_data['proprietor']),
                            # "hotel": acc_models.Hotel.objects.get(pk=validated_data['hotel']),
                            "contact_number": validated_data['contact_number']
                        }

                    )



                return user

        except TypeError:
            return TypeError("There is some error in processing your data.")

   


class LeanUserSerializer(serializers.ModelSerializer):
    related_profile = UserProfileSerializer(many=True, read_only=True)
    related_groups = UserGroupSerializer(
        source='groups',  many=True, read_only=True)
    

    class Meta:
        model = User

        fields = [

            'id',
            'username',
            'first_name',
            'last_name',
            'related_profile',
            'is_staff',
            'related_groups'

        ]