from hims.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hims.configuration import serializers
from durin.auth import TokenAuthentication

class HotelList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Hotel.objects.all()
    serializer_class = serializers.HotelSerializer
    # pagination.PageNumberPagination.page_size = 2


class HotelDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Hotel
    serializer_class = serializers.HotelSerializer