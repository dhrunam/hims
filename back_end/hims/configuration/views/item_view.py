from hims.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hims.configuration import serializers
from durin.auth import TokenAuthentication

class ItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer
    # pagination.PageNumberPagination.page_size = 2

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