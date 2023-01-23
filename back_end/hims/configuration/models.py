from ctypes.wintypes import PINT
from unicodedata import name
from django.db import models


# Create your models here.

class State(models.Model):
    name=models.CharField(max_length=64,blank=False, unique=True)
    def __str__(self) -> str:
        return super().__str__()



class District(models.Model):

    state=models.ForeignKey(State, related_name='state', null=True, on_delete=models.SET_NULL, default=1)
    name=models.CharField(max_length=64,blank=False, unique=True)
    def __str__(self) -> str:
        return super().__str__()

class DesignationMaster(models.Model):
    name = models.CharField(max_length=64,blank=False, unique=True)
    
    def __str__(self) -> str:
        return super().__str__()

class Proprietor(models.Model):
    name=models.CharField(max_length=128,blank=False)
    address_line1=models.CharField(max_length=128, blank=False)
    address_line2=models.CharField(max_length=128,blank=True, default='')
    address_line3=models.CharField(max_length=128,blank=True, default='')
    pin=models.CharField(max_length=6)
    contact_number= models.CharField(max_length=12, blank=True, default='')
    def __str__(self) -> str:
        return super().__str__()




class Hotel(models.Model):
    state=models.ForeignKey(State,on_delete=models.SET_NULL, null=True, related_name='hotel_state')
    district=models.ForeignKey(District,on_delete=models.SET_NULL, null=True, related_name='hotel_district')
    proprietor = models.ForeignKey(Proprietor, on_delete=models.SET_NULL, null=True, related_name='hotel_proprietor')
    name=models.CharField(max_length=128,blank=False)
    short_name=models.CharField(max_length=3,blank=False)
    address_line1=models.CharField(max_length=128, blank=False)
    address_line2=models.CharField(max_length=128,blank=True, default='')
    address_line3=models.CharField(max_length=128,blank=True, default='')
    pin=models.CharField(max_length=6)
    contact_number= models.CharField(max_length=12, blank=True, default='')
    def __str__(self) -> str:
        return super().__str__()

class DepartmentMaster(models.Model):
    # office=models.ForeignKey(Hotel,on_delete=models.SET_NULL, null=True)
    name=models.CharField(max_length=128,blank=False)
    short_name=models.CharField(max_length=3,blank=False)

    def __str__(self) -> str:
        return super().__str__()

class HotelDepartment(models.Model):
    hotel=models.ForeignKey(Hotel,on_delete=models.SET_NULL, null=True)
    department=models.ForeignKey(DepartmentMaster, on_delete=models.SET_NULL, null=True)
    
    def __str__(self) -> str:
        return super().__str__()



# Item Type Master

# class ItemType(models.Model):
#     name = models.CharField(max_length=128, unique=True)
#     def __str__(self) -> str:
#         return super().__str__()

# Item Master

class Item(models.Model):
    name = models.CharField(max_length=128, blank=False, unique=True)
    department=models.ForeignKey(DepartmentMaster,null=True, on_delete=models.SET_NULL, related_name='related_department')
    # item_type = models.ForeignKey(ItemType, related_name="item_type",  on_delete=models.SET_NULL, null=True)
    def __str__(self) -> str:
        return super().__str__()

# Unit Master
class Unit(models.Model):
    name = models.CharField(max_length=128,blank=False, unique=True) # like set, unit, piece, bundle, kilo gram
    short_name = models.CharField(max_length=10) # let pc, kg 
    def __str__(self) -> str:
        return super().__str__()


