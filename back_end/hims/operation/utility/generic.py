def get_available_item_count(self,item_in_from_hotel):
        if item_in_from_hotel:
            count = (item_in_from_hotel.opening_balance
                                                       + item_in_from_hotel.received
                                                       - item_in_from_hotel.damaged
                                                       - item_in_from_hotel.returned
                                                       - item_in_from_hotel.transferred
                    )
            return count