from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hims.operation import serializers
from durin.auth import TokenAuthentication

class HotelItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemInHotel.objects.all()
    serializer_class = serializers.ItemInHotelSerializer
    # pagination.PageNumberPagination.page_size = 2


class HotelItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemInHotel
    serializer_class = serializers.ItemInHotelSerializer