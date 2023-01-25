# from turtle import update
from unicodedata import name
from django.db import models
from django.contrib.auth.models import User
from hims.configuration.models import (
    DesignationMaster, Proprietor, Hotel, DepartmentMaster
)


# Create your models here.


class UserProfile(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='related_profile')
    designation = models.ForeignKey(
        DesignationMaster, on_delete=models.SET_NULL, null=True, related_name='related_designation')
    department = models.ForeignKey(
        DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='user_related_department')
    proprietor = models.ForeignKey(
        Proprietor, on_delete=models.SET_NULL, null=True, related_name='related_proprietor')
    hotel = models.ForeignKey(
        Hotel, on_delete=models.SET_NULL, null=True, related_name='related_hotel')
    contact_number = models.CharField(max_length=12, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
