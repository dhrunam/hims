import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";

@Injectable({providedIn: 'root'})
export class HotelService{
    constructor(private http: HttpClient){}
    add_hotel(fd:FormData){
        return this.http.post(`${URL}/api/hotel`,fd);
    }
    update_hotel(fd:FormData){
        return this.http.patch(`${URL}/api/hotel`,fd);
    }
    get_hotels(){
        return this.http.get<any>(`${URL}/api/hotel`);
    }
}