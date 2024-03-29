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
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """

        # order_number = self.request.data['order_no']
        queryset = op_model.ItemInHotel.objects.all()
        item_id = self.request.query_params.get('item_id')
        hotel_id= self.request.query_params.get('hotel_id')
        

        if(item_id):
            queryset = queryset.filter(item=item_id)

        if(hotel_id):
            queryset = queryset.filter(hotel=hotel_id)
        
        return queryset

class HotelItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemInHotel
    serializer_class = serializers.ItemInHotelSerializer