export interface ItemTransfer{
    hotel?:string;
    from_hotel?: string;
    from_department?: string;
    to_hotel: string;
    to_department: string;
    to_hotel_name?: string;
    to_department_name?: string;
    item: string;
    item_name?: string;
    opening_balance: string;
    quantity_transferred: string;
    transferred_on:string;
    remarks: string;
    is_acknowledged?: string;
    expiry_date: string;
    unit_price: string;
    batch_no?: string;
}