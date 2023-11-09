import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
@Injectable({ providedIn: 'root' })
export class VendorService{
    constructor(private http: HttpClient){}
    get_vendors(){
        return this.http.get<any>(`${URL}/api/vendor`);
    }
    get_vendor(id: number){
        return this.http.get<any>(`${URL}/api/vendor/${id}`);
    }
    add_vendor(data: FormData){
        return this.http.post(`${URL}/api/vendor`, data);
    }
    update_vendor(data: FormData){
        return this.http.put(`${URL}/api/vendor/${data.get('id')}`, data);
    }
    delete_vendor(id: number){
        return this.http.delete(`${URL}/api/vendor/${id}`);
    }
}