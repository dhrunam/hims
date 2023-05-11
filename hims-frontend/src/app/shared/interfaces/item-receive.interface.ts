export interface ItemReceive{
    hotel?: string;
    item: string;
    item_name?: string;
    vendor: string;
    vendor_name?: string;
    max_level?: string;
    min_level?: string;
    batch_no?: string;
    opening_balance: number;
    quantity_received: number;
    unit_price: number;
    expiry_date: string;
    remarks: string;
    received_on: string;
    created_by?: string;
  }