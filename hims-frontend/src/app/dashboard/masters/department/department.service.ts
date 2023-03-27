import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
@Injectable({providedIn: 'root'})
export class DepartmentService{
    constructor(private http: HttpClient){}
    get_departments(){
        return this.http.get<any>(`${URL}/api/department`)
    }
    get_department(id:number){
        return this.http.get<any>(`${URL}/api/department/${id}`)
    }
    add_department(fd: FormData){
        return this.http.post(`${URL}/api/department`, fd);
    }
    update_department(fd: FormData){
        return this.http.patch(`${URL}/api/department/${fd.get('id')}`, fd);
    }
    delete_department(fd:FormData){
        return this.http.delete(`${URL}/api/department/${fd.get('id')}`);
    }
}