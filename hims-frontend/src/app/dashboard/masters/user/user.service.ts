import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
@Injectable({providedIn: 'root'})
export class UserService{
    constructor(private http: HttpClient){}
    get_users(){
        return this.http.get<any>(`${URL}/api/user/reg`);
    }
    get_user(id:number){
        return this.http.get<any>(`${URL}/api/user/reg/${id}`);
    }
    add_user(fd:FormData){
        return this.http.post(`${URL}/api/user/reg`, fd);
    }
    update_user(fd: FormData){
        return this.http.patch(`${URL}/api/user/reg/${fd.get('id')}`, fd);
    }
    delete_user(fd: FormData){
        return this.http.delete(`${URL}/api/user/reg/${fd.get('id')}`);
    }
}