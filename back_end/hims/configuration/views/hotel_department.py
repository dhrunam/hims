from hims.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hims.configuration import serializers
from durin.auth import TokenAuthentication

class HotelDepartmentList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.HotelDepartment.objects.all()
    serializer_class = serializers.HotelDepartmentSerializer
    # pagination.PageNumberPagination.page_size = 2


class HotelDepartmentDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.HotelDepartment
    serializer_class = serializers.HotelDepartmentSerializer