from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hims.operation import serializers
from durin.auth import TokenAuthentication


class PropertyWiseItemSummary(generics.ListAPIView):
    queryset = op_model.ItemInHotel.objects.all()
    serializer_class=serializers.SummaryReportSerializers

    def get_queryset(self):
        
        hotel_id = self.request.query_params.get('hotel')
        item_id = self.request.query_params.get('item')
        department_id = self.request.query_params.get('department')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        queryset = op_model.ItemInHotel.objects.raw(
            '''
                select  dr.date_range
                , dr.id
                ,dr.name
                , dr.department_id
                , dr.hotel_id
                --,coalesce(ir.opening_balance,0) as opening_balance
                ,coalesce(ir.quantity_received,0) as quantity_received
                --,coalesce(dm.opening_balance,0) as opening_balance
                ,coalesce(dm.quantity_damaged,0) as quantity_damaged
                --,coalesce(rt.opening_balance,0) as opening_balance
                ,coalesce(rt.quantity_returned,0) as quantity_returned
                --,coalesce(tr.opening_balance,0) as opening_balance
                ,coalesce(tr.quantity_transferred,0) as quantity_transferred
                , case 	when ir.received_on < dm.damaged_on and dm.damaged_on < rt.returned_on and rt.returned_on < tr.transferred_on
                        then coalesce(ir.opening_balance,0)
                        when dm.damaged_on < rt.returned_on and rt.returned_on < tr.transferred_on and tr.transferred_on < ir.received_on 
                        then coalesce(dm.opening_balance,0)
                        when rt.returned_on < tr.transferred_on and tr.transferred_on < ir.received_on and  ir.received_on <  dm.damaged_on
                        then coalesce(rt.opening_balance,0)
                        else  coalesce(tr.opening_balance,0)
                end as sod_opening_balance
                from
                (
                    select dr.date_range, im.id, im.name,im.department_id, hi.hotel_id

                    from

                    (SELECT generate_series(coalesce(%s, current_date)::date,coalesce(%s, current_date)::date, '1 day'::interval)::date AS date_range) as dr
                    cross join public.configuration_item as im
                    join public.operation_iteminhotel as hi on hi.item_id=im.id
                    
                ) as dr

                left join (
                    select ci.id, ir.received_on::date, ir.opening_balance, ir.quantity_received,  ir.hotel_id from public.configuration_item as ci
                    join public.operation_itemreceived as ir on ci.id=ir.item_id
                ) as ir on ir.received_on=dr.date_range and ir.id=dr.id and ir.hotel_id=dr.hotel_id

                left join (
                    select ci.id, dm.damaged_on::date, dm.opening_balance, dm.quantity_damaged, dm.hotel_id from public.configuration_item as ci
                    join public.operation_itemdamaged as dm on ci.id=dm.item_id
                ) as dm on dm.damaged_on=dr.date_range  and dm.id=dr.id and dm.hotel_id=dr.hotel_id
                left join (
                    select ci.id, rt.returned_on::date, rt.opening_balance, rt.quantity_returned, rt.hotel_id from public.configuration_item as ci
                    join public.operation_itemreturned as rt on ci.id=rt.item_id
                ) as rt on rt.returned_on = dr.date_range  and rt.id=dr.id and rt.hotel_id=dr.hotel_id

                left join (
                    select ci.id, tr.transferred_on::date, tr.opening_balance, tr.quantity_transferred, tr.from_hotel_id as hotel_id from public.configuration_item as ci
                    join public.operation_itemtransferred as tr on ci.id=tr.item_id
                ) as tr on tr.transferred_on = dr.date_range  and tr.id=dr.id and tr.hotel_id=dr.hotel_id

                where dr.hotel_id=coalesce( %s,dr.hotel_id)
                and dr.id=coalesce( %s,dr.id)
                and dr.department_id = coalesce( %s,dr.department_id)
                order by dr.date_range asc, dr.id asc


            ''',
            [start_date, end_date,hotel_id, item_id, department_id]
        )


        return queryset



   

# class ItemSummaryReport(views.APIView):
#     def get(self, request):
#         hotel_id = self.request.query_params.get('hotel_id')
#         start_date = self.request.query_params.get('start_date')
#         end_date = self.request.query_params.get('end_date')
#         query_params={'hotel_id':hotel_id,'start_date':start_date,'end_date':end_date}
#         print('params:', query_params)
#         # Your custom filtering logic here
#         filtered_results = self.filter_raw_queryset(query_params)

#         # Return the filtered results
#         return Response(filtered_results)

#     def filter_raw_queryset(self,query_params):
#         # Get the raw queryset using objects.raw()
#         queryset = op_model.ItemInHotel.objects.raw(
#             '''
#                 select  dr.date_range, dr.id,dr.name, dr.hotel_id
#                 --,coalesce(ir.opening_balance,0) as opening_balance
#                 ,coalesce(ir.quantity_received,0) as quantity_received
#                 --,coalesce(dm.opening_balance,0) as opening_balance
#                 ,coalesce(dm.quantity_damaged,0) as quantity_damaged
#                 --,coalesce(rt.opening_balance,0) as opening_balance
#                 ,coalesce(rt.quantity_returned,0) as quantity_returned
#                 --,coalesce(tr.opening_balance,0) as opening_balance
#                 ,coalesce(tr.quantity_transferred,0) as quantity_transferred
#                 , case 	when ir.received_on < dm.damaged_on and dm.damaged_on < rt.returned_on and rt.returned_on < tr.transferred_on
#                         then coalesce(ir.opening_balance,0)
#                         when dm.damaged_on < rt.returned_on and rt.returned_on < tr.transferred_on and tr.transferred_on < ir.received_on 
#                         then coalesce(dm.opening_balance,0)
#                         when rt.returned_on < tr.transferred_on and tr.transferred_on < ir.received_on and  ir.received_on <  dm.damaged_on
#                         then coalesce(rt.opening_balance,0)
#                         else  coalesce(tr.opening_balance,0)
#                 end as sod_opening_balance
#                 from
#                 (
#                     select dr.date_range, im.id, im.name, hi.hotel_id

#                     from

#                     (SELECT generate_series(%s::date, %s::date, '1 day'::interval)::date AS date_range) as dr
#                     cross join public.configuration_item as im
#                     join public.operation_iteminhotel as hi on hi.item_id=im.id
                    
#                 ) as dr

#                 left join (
#                     select ci.id, ir.received_on::date, ir.opening_balance, ir.quantity_received,  ir.hotel_id from public.configuration_item as ci
#                     join public.operation_itemreceived as ir on ci.id=ir.item_id
#                 ) as ir on ir.received_on=dr.date_range and ir.id=dr.id and ir.hotel_id=dr.hotel_id

#                 left join (
#                     select ci.id, dm.damaged_on::date, dm.opening_balance, dm.quantity_damaged, dm.hotel_id from public.configuration_item as ci
#                     join public.operation_itemdamaged as dm on ci.id=dm.item_id
#                 ) as dm on dm.damaged_on=dr.date_range  and dm.id=dr.id and dm.hotel_id=dr.hotel_id
#                 left join (
#                     select ci.id, rt.returned_on::date, rt.opening_balance, rt.quantity_returned, rt.hotel_id from public.configuration_item as ci
#                     join public.operation_itemreturned as rt on ci.id=rt.item_id
#                 ) as rt on rt.returned_on = dr.date_range  and rt.id=dr.id and rt.hotel_id=dr.hotel_id

#                 left join (
#                     select ci.id, tr.transferred_on::date, tr.opening_balance, tr.quantity_transferred, tr.from_hotel_id as hotel_id from public.configuration_item as ci
#                     join public.operation_itemtransferred as tr on ci.id=tr.item_id
#                 ) as tr on tr.transferred_on = dr.date_range  and tr.id=dr.id and tr.hotel_id=dr.hotel_id
#                 --where dr.hotel_id=


#             ''',
#             [query_params['start_date'], query_params['end_date']]
#         )


#         # Apply further filtering logic
#         filtered_results = [obj for obj in queryset if self.custom_filter_condition(obj)]

#         return filtered_results

#     def custom_filter_condition(self, obj):
#             # Define your custom filter condition here
#             # Return True if the object should be included, False otherwise
#             # Example: Only include objects with a certain property value
#         return obj

    