import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
@Injectable({providedIn: 'root'})
export class ItemService{
    constructor(private http: HttpClient){}
    get_items(){
        return this.http.get<any>(`${URL}/api/item`);
    }
    get_items_by_department(dept_id: number){
        return this.http.get<any>(`${URL}/api/item?dept_id=${dept_id}`);
    }
    get_item(id:number){
        return this.http.get<any>(`${URL}/api/op/item/hotel?item_id=${id}`);
    }
    add_item(fd: FormData){
        return this.http.post(`${URL}/api/item`,fd);
    }
    update_item(fd: FormData){
        return this.http.patch(`${URL}/api/item/${fd.get('id')}`, fd);
    }
    delete_item(fd: FormData){
        return this.http.delete(`${URL}/api/item/${fd.get('id')}`);
    }
}