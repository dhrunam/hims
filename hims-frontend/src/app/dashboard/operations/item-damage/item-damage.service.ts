import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    get_opening_balance(hotel_id:number, item_id: number){
        return this.http.get<any>(`${URL}/api/op/item/hotel`, { params: { hotel_id: hotel_id, item_id: item_id,}});
    }
}