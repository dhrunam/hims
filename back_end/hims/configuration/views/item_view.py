from hims.configuration import models
from rest_framework import generics, pagination, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
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

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)