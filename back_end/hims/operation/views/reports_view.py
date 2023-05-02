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
        
        hotel_id = self.request.query_params.get('hotel_id')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        queryset = op_model.ItemInHotel.objects.raw(
            '''
            select m.* 

            , coalesce( rec.opening_balance,0) as rec_opening_balance, coalesce( rec.quantity_received, 0) as quantity_received
            , coalesce( dam.opening_balance,0) as dam_opening_balance, coalesce(dam.quantity_damaged,0) as quantity_damaged
            , coalesce(ret.opening_balance,0) as ret_opening_balance, coalesce(ret.quantity_returned,0) as quantity_returned
            , coalesce(tra.opening_balance,0) as tra_opening_balance, coalesce(tra.quantity_transferred,0) as quantity_transferred
            from 
            (
                select dates.date_range, i.id, i.name, coalesce(ih.opening_balance+ih.received - ih.damaged - ih.returned - ih.transferred,0) as current_balance  from  public.configuration_item as i
                left join  public.operation_iteminhotel as ih on i.id=ih.item_id
                
                cross join (SELECT generate_series(%s::date, %s::date, '1 day'::interval) AS date_range) as dates

                ) as m

            left join public.operation_itemreceived as rec  on rec.received_on = m.date_range and rec.item_id=m.id
            left join public.operation_itemdamaged as dam on dam.damaged_on = m.date_range and  dam.item_id=m.id
            left join public.operation_itemreturned as ret on ret.returned_on = m.date_range and  ret.item_id=m.id
            left join public.operation_itemtransferred as tra on tra.transferred_on= m.date_range and tra.item_id=m.id
            where m.hotel_id = %s
            order by date_range, id
            ''',
            [start_date, end_date,hotel_id]
        )
        return queryset


