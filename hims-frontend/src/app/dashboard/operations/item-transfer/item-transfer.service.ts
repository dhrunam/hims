import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
import { ItemTransfer } from "src/app/shared/interfaces/item-transfer.interface";
import { map } from "rxjs";
@Injectable({providedIn: 'root'})
export class ItemTransferService{
    constructor(private http: HttpClient){}

    get_items_transferred(){
        return this.http.get<any>(`${URL}/api/op/item/transferred`);
    }
    transfer_item(items: ItemTransfer[]){
        return this.http.post(`${URL}/api/op/item/transferred`, { data: items } );
    }
    get_item_transferred(batch_no:string){
        return this.http.get<any>(`${URL}/api/op/item/transferred/batch/items?batch_no=${batch_no}`)
        .pipe(map(respData => {
            let respArray: Array<ItemTransfer> = [];
            respData.forEach((data:any) => {
                let d:ItemTransfer = {
                    to_hotel: data.to_hotel,
                    to_department: data.to_department,
                    to_hotel_name: data.related_to_hotel.name,
                    to_department_name: data.related_to_department.name,
                    item: data.related_item.id,
                    item_name: data.related_item.name,
                    batch_no: data.batch_no,
                    opening_balance: data.opening_balance,
                    quantity_transferred: data.quantity_transferred,
                    unit_price: data.unit_price,
                    expiry_date: data.expiry_date,
                    remarks: data.remarks,
                    transferred_on: data.transferred_on,
                }
                respArray.push(d);
            })
            return respArray;
        }))
    }
}