import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemReturn } from "src/app/shared/interfaces/item-return.interface";
import { URL } from "src/environment/environment.prod";
@Injectable({providedIn: 'root'})
export class ItemReturnService{
    constructor(private http: HttpClient){}

    get_items_returned(){
        return this.http.get<any>(`${URL}/api/op/item/returned`);
    }
    return_item(items: ItemReturn[]){
        return this.http.post(`${URL}/api/op/item/returned`, { data: items } );
    }
    get_opening_balance(hotel_id:number, item_id: number){
        return this.http.get<any>(`${URL}/api/op/item/hotel`, { params: { hotel_id: hotel_id, item_id: item_id,}});
    }
}