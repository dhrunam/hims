from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hims.operation import serializers
from durin.auth import TokenAuthentication


class PropertyWiseItemSummary(generics.RetrieveAPIView):

    serializer_class=serializers.ItemInHotelSerializer

    def get_queryset(self):

        queryset=op_model.ItemInHotel.objects.raw(
            '''select ih.id,rec.quantity_received, rec.hotel_id, rec.item_id,
            rec.opening_balance, rec.expiry_date, rec.unit_price, rec.batch_no, rec.received_on
            from public.operation_iteminhotel as ih
            left join public.operation_itemreceived as rec  on ih.id=rec.item_id and (rec.received_on >= '2023-03-01' and rec.received_on<='2023-03-31')
            left join public.operation_itemdamaged as dam on ih.id=dam.item_id and  (dam.damaged_on >= '2023-03-01' and dam.damaged_on<='2023-03-31')
            left join public.operation_itemreturned as ret on ih.id=ret.item_id and (ret.returned_on >= '2023-03-01' and ret.returned_on<='2023-03-31')''',
            []
        )
        return queryset


