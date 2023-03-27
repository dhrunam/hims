from hims.configuration import models
from rest_framework import generics, pagination, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from hims.configuration import serializers
from durin.auth import TokenAuthentication

class DepartmentList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.DepartmentMaster.objects.all()
    serializer_class = serializers.DepartmentMasterSerializer
    # pagination.PageNumberPagination.page_size = 2


class DepartmentDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.DepartmentMaster
    serializer_class = serializers.DepartmentMasterSerializer

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)