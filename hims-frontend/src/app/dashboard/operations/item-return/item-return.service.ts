import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ItemReturn } from "src/app/shared/interfaces/item-return.interface";
import { URL } from "src/environment/environment.prod";
@Injectable({providedIn: 'root'})
export class ItemReturnService{
    constructor(private http: HttpClient){}
    get_items_returned(start_date: Date, end_date: Date, hotel_id: number, department_id: number){
        let params = new HttpParams();
        params = params.append('start_date', start_date.toString());
        params = params.append('end_date', end_date.toString());
        params = params.append('hotel', hotel_id);
        params = params.append('department', department_id);
        return this.http.get<any>(`${URL}/api/op/item/returned`, { params });
    }
    get_item_returned(batch_no: string){
        return this.http.get<any>(`${URL}/api/op/item/returned/batch/items?batch_no=${batch_no}`)
        .pipe(map(respData => {
            let respArray: Array<ItemReturn> = [];
            respData.forEach((data:any) => {
                let d:ItemReturn = {
                    item: data.related_item.id,
                    item_name: data.related_item.name,
                    batch_no: data.batch_no,
                    opening_balance: data.opening_balance,
                    quantity_returned: data.quantity_returned,
                    unit_price: data.unit_price,
                    expiry_date: data.expiry_date,
                    remarks: data.remarks,
                    returned_on: data.returned_on,
                }
                respArray.push(d);
            })
            return respArray;
        }))
    }
    return_item(items: ItemReturn[]){
        return this.http.post(`${URL}/api/op/item/returned`, { data: items } );
    }
    get_opening_balance(hotel_id:number, item_id: number){
        return this.http.get<any>(`${URL}/api/op/item/hotel`, { params: { hotel_id: hotel_id, item_id: item_id,}});
    }
}