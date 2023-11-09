import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ItemDamage } from "src/app/shared/interfaces/item-damaged.interface";
import { URL } from "src/environment/environment.prod";
@Injectable({ providedIn: 'root'})
export class ItemDamageService{
    constructor(private http: HttpClient){}
    get_items_discarded(){
        return this.http.get<any>(`${URL}/api/op/item/damaged`);
    }
    discard_item(items: ItemDamage[]){
        return this.http.post(`${URL}/api/op/item/damaged`, { data: items } );
    }
    get_item_discarded(batch_no:string){
        return this.http.get<any>(`${URL}/api/op/item/damaged/batch/items?batch_no=${batch_no}`)
        .pipe(map(respData => {
            let respArray: Array<ItemDamage> = [];
            respData.forEach((data:any) => {
                console.log(data);
                let d:ItemDamage = {
                    item: data.related_item.id,
                    item_name: data.related_item.name,
                    batch_no: data.batch_no,
                    opening_balance: data.opening_balance,
                    quantity_damaged: data.quantity_damaged,
                    unit_price: data.unit_price,
                    expiry_date: data.expiry_date,
                    remarks: data.remarks,
                    damaged_on: data.damaged_on,
                }
                respArray.push(d);
            })
            return respArray;
        }))
    }
}