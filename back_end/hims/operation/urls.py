
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from durin import views as durin_views
from hims.operation import views


urlpatterns = [
    
    # path(r'refresh/', durin_views.RefreshView.as_view(), name='durin_refresh'),
    # path(r'logout/', durin_views.LogoutView.as_view(), name='durin_logout'),
    # path(r'logoutall/', durin_views.LogoutAllView.as_view(), name='durin_logoutall'),
    path('api/op/item/received', views.ReceivedItemList.as_view()),
    path('api/op/item/received/<int:pk>', views.ReceivedItemDetails.as_view()),

    path('api/op/item/received/batch', views.ReceivedItemBatches.as_view()),
    path('api/op/item/received/batch/items', views.ReceivedItemPerBatch.as_view()),
    
    path('api/op/item/returned', views.ReturnedItemList.as_view()),
    path('api/op/item/returned/<int:pk>', views.ReturnedItemDetails.as_view()),

    path('api/op/item/returned/batch', views.ReturnedItemBatches.as_view()),
    path('api/op/item/returned/batch/items', views.ReturnedItemPerBatch.as_view()),
    

    path('api/op/item/damaged', views.DamagedItemList.as_view()),
    path('api/op/item/damaged/<int:pk>', views.DamagedItemDetails.as_view()),

    path('api/op/item/damaged/batch', views.DamagedItemBatches.as_view()),
    path('api/op/item/damaged/batch/items', views.DamagedItemPerBatch.as_view()),
    

    path('api/op/item/transferred', views.TransferredItemList.as_view()),
    path('api/op/item/transferred/<int:pk>', views.TransferredItemDetails.as_view()),

    path('api/op/item/transferred/batch', views.TransferredItemBatches.as_view()),
    path('api/op/item/transferred/batch/items', views.TransferredItemPerBatch.as_view()),
    

    path('api/op/item/hotel', views.HotelItemList.as_view()),
    path('api/op/item/hotel/<int:pk>', views.HotelItemDetails.as_view()),
    
    path('api/report/hotel/item', views.PropertyWiseItemSummary.as_view()),
    # path('api/report/hotel/item/summary', views.ItemSummaryReport.as_view()),

]