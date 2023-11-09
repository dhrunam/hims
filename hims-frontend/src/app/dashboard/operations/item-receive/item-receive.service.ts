import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemReceive } from "src/app/shared/interfaces/item-receive.interface";
import { URL } from "src/environment/environment.prod";
import { map } from "rxjs";
@Injectable({providedIn: 'root'})
export class ItemReceiveService{
    constructor(public http: HttpClient){}
    receive_item(data: ItemReceive[]){
        const d = {
          data: data,
        }
        return this.http.post(`${URL}/api/op/item/received`, d);
    }
    get_items_received(id: number){
        return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
    }
    get_item_received(batch_no: string){
        return this.http.get<any>(`${URL}/api/op/item/received/batch/items?batch_no=${batch_no}`)
        .pipe(map(respData => {
            let respArray: Array<ItemReceive> = [];
            respData.forEach((data:any) => {
                let d:ItemReceive = {
                    item: data.related_item.id,
                    item_name: data.related_item.name,
                    batch_no: data.batch_no,
                    opening_balance: data.opening_balance,
                    quantity_received: data.quantity_received,
                    unit_price: data.unit_price,
                    expiry_date: data.expiry_date,
                    remarks: data.remarks,
                    received_on: data.received_on,
                    created_by: `${data.related_create_user.first_name} ${data.related_create_user.last_name}`
                }
                respArray.push(d);
            })
            return respArray;
        }))
    }
    get_opening_balance(hotel_id:number, item_id: number){
        return this.http.get<any>(`${URL}/api/op/item/hotel`, { params: { hotel_id: hotel_id, item_id: item_id,}});
    }
}