from hims.configuration import models
from rest_framework import generics, pagination, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from hims.configuration import serializers
from durin.auth import TokenAuthentication

class DistrictList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.District.objects.all()
    serializer_class = serializers.ManageDistrictSerializer
    # pagination.PageNumberPagination.page_size = 2


class DistrictDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.District
    serializer_class = serializers.DistrictSerializer

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)