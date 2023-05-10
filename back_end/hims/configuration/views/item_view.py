from hims.configuration import models
from rest_framework import generics, pagination, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from hims.configuration import serializers
from durin.auth import TokenAuthentication
from django.db import transaction, connection
from hims.operation import models as op_models
import json

class ItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer
    # pagination.PageNumberPagination.page_size = 2

    @transaction.atomic
    def perform_create(self, serializer):


        instance = serializer.save()

        item_in_hotel = json.loads(self.request.data['hotels'])
        print(item_in_hotel)
        if item_in_hotel:

            for element in item_in_hotel:

                op_models.ItemInHotel.objects.create(
                    hotel=models.Hotel.objects.get(id=element['hotel_id']),
                    item=instance,
                    min_level = element['min_level'],


                )


        return instance

    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """

        # order_number = self.request.data['order_no']
        search_text = self.request.query_params.get('dept_id')

        if(search_text):
            return models.Item.objects.filter(department=search_text)

        return models.Item.objects.all()


class ItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Item
    serializer_class = serializers.ItemSerializer

    def perform_update(self, serializer):

        instance = serializer.save()

        item_in_hotel = json.loads(self.request.data['hotels'])

        print(item_in_hotel)

        if item_in_hotel:

            for element in item_in_hotel:

                models.Hotel.objects.filter(hotel=element['hotel_id'],item=instance.id).delete()

                op_models.ItemInHotel.objects.create(
                    hotel=models.Hotel.objects.get(id=element['hotel_id']),
                    item=instance,
                    min_level = element['min_level'],


                )


        return instance

        return super().perform_update(serializer)

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)