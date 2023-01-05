
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from durin import views as durin_views
from hims.configuration import views


urlpatterns = [
    
    # path(r'refresh/', durin_views.RefreshView.as_view(), name='durin_refresh'),
    # path(r'logout/', durin_views.LogoutView.as_view(), name='durin_logout'),
    # path(r'logoutall/', durin_views.LogoutAllView.as_view(), name='durin_logoutall'),
    path('api/state', views.StateList.as_view()),
    path('api/state/<int:pk>', views.StateDetails.as_view()),

    path('api/district', views.DistrictList.as_view()),
    path('api/district/<int:pk>', views.DistrictDetails.as_view()),

    path('api/designation', views.DesignationList.as_view()),
    path('api/designation/<int:pk>', views.DesignationDetails.as_view()),

    path('api/proprietor', views.ProprietorList.as_view()),
    path('api/proprietor/<int:pk>', views.ProprietorDetails.as_view()),

    path('api/hotel', views.HotelList.as_view()),
    path('api/hotel/<int:pk>', views.HotelDetails.as_view()),

    path('api/department', views.DepartmentList.as_view()),
    path('api/department/<int:pk>', views.DepartmentDetails.as_view()),

    path('api/item', views.ItemList.as_view()),
    path('api/item/<int:pk>', views.ItemDetails.as_view()),

    path('api/unit', views.UnitList.as_view()),
    path('api/unit/<int:pk>', views.UnitDetails.as_view()),

    path('api/hotel_department', views.HotelDepartmentList.as_view()),
    path('api/hotel_department/<int:pk>', views.HotelDepartmentDetails.as_view()),

]