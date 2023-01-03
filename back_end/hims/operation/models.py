from ctypes.wintypes import PINT
from unicodedata import name
from django.db import models
from hims.configuration import models as config_model
from hims.account import models as acc_model

# Create your models here.


#Item Transection in Hotel

class ItemReceived(models.Model):
    hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    quantity_received=models.IntegerField(default=0)
    created_by = models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_received_created_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemReturned(models.Model):
    hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    quantity_returned=models.IntegerField(default=0)
    created_by = models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_returned_created_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

class ItemDamaged(models.Model):
    hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    quantity_damaged=models.IntegerField(default=0)
    created_by = models.ForeignKey(
     acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_damaged_created_by')
    created_at = models.DateTimeField(auto_now=True, blank=False)

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
    
