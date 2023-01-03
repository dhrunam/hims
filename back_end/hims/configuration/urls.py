
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

]