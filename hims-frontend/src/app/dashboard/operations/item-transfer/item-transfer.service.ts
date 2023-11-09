import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
import { ItemTransfer } from "src/app/shared/interfaces/item-transfer.interface";
@Injectable({providedIn: 'root'})
export class ItemTransferService{
    constructor(private http: HttpClient){}

    get_items_transferred(){
        return this.http.get<any>(`${URL}/api/op/item/transferred`);
    }
    transfer_item(items: ItemTransfer[]){
        return this.http.post(`${URL}/api/op/item/transferred`, { data: items } );
    }
    get_opening_balance(hotel_id:number, item_id: number){
        return this.http.get<any>(`${URL}/api/op/item/hotel`, { params: { hotel_id: hotel_id, item_id: item_id,}});
    }
}