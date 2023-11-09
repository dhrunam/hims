from ctypes.wintypes import PINT
from unicodedata import name
from django.db import models
from hims.configuration import models as config_model
from hims.account import models as acc_model

# Create your models here.

#Item Transection in Hotel

class AvailableItemQuantitySnapshot(models.Model):
   
    item = models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    opening_balance = models.IntegerField(default=0)
    quantity_received = models.IntegerField(default=0)
    quantity_returned = models.IntegerField(default=0)
    quantity_damaged = models.IntegerField(default=0)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["item"],
                name="unique_item",
            ),
        ]


class ItemReceived(models.Model):
    hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    vendor=models.ForeignKey(config_model.Vendor, null=True, on_delete=models.SET_NULL)
    batch_no=models.CharField(max_length=128, null=True)
    opening_balance=models.IntegerField(default=0)
    quantity_received=models.IntegerField(default=0)
    unit_price=models.DecimalField(default=0, decimal_places=2, max_digits=10)
    expiry_date=models.DateField(auto_now=False, auto_now_add=False,blank=True, null=True)
    received_on = models.DateTimeField(blank=False)
    remarks=models.CharField(max_length=1024, default='', null=True)
    created_by = models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_received_created_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemReturned(models.Model):
    batch_no=models.CharField(max_length=128, null=True)
    hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    opening_balance=models.IntegerField(default=0)
    quantity_returned=models.IntegerField(default=0)
    unit_price=models.DecimalField(default=0, decimal_places=2, max_digits=10)
    expiry_date=models.DateField(auto_now=False, auto_now_add=False,blank=True, null=True)
    returned_on = models.DateTimeField(blank=False)
    remarks=models.CharField(max_length=1024, default='', null=True)
    created_by = models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_returned_created_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemDamaged(models.Model):
    batch_no=models.CharField(max_length=128, null=True)
    hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    opening_balance=models.IntegerField(default=0)
    quantity_damaged=models.IntegerField(default=0)
    unit_price=models.DecimalField(default=0, decimal_places=2, max_digits=10)
    expiry_date=models.DateField(auto_now=False, auto_now_add=False,blank=True, null=True)
    remarks=models.CharField(max_length=1024, default='', null=True)
    damaged_on = models.DateTimeField(blank=False)
    created_by = models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_damaged_created_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemTransferred(models.Model):
    batch_no=models.CharField(max_length=128, null=True)
    from_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='from_hotel')
    to_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='to_hotel')

    from_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='from_department')
    to_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='to_department')
   
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    opening_balance=models.IntegerField(default=0)
    quantity_transferred=models.IntegerField(default=0)
    unit_price=models.DecimalField(default=0, decimal_places=2, max_digits=10)
    expiry_date=models.DateField(auto_now=False, auto_now_add=False,blank=True, null=True)
    remarks=models.CharField(max_length=1024, default='', null=True)
    transferred_on = models.DateTimeField(blank=False)
    created_by = models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_transferred_created_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

    is_acknowledged = models.BooleanField(default=False, null=False)
    acknowledged_by=models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_transferred_acknowledged_by')

# Items in Hotel
class ItemInHotel(models.Model):
    hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    opening_balance=models.IntegerField(default=0)
    received=models.IntegerField(default=0)
    damaged=models.IntegerField(default=0)
    returned=models.IntegerField(default=0)
    transferred=models.IntegerField(default=0)
    min_level=models.IntegerField(default=0)
    max_level=models.IntegerField(default=0)


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["hotel", "item"],
                name="unique_item_of_hotel",
            ),
        ]

