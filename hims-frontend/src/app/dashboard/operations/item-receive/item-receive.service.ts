import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemReceive } from "./edit/edit.component";
import { URL } from "src/environment/environment.prod";
@Injectable({providedIn: 'root'})
export class ItemReceiveService{
    constructor(public http: HttpClient){}
    receive_item(data: ItemReceive[]){
        const d = {
          data: data,
        }
        return this.http.post(`${URL}/api/op/item/received`, d);
    }
    get_item_received(id: string){
        return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
    }
}