import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(fd:any){
    return this.http.post<any>(`${URL}/api/auth/login/`, fd);
  }
  logout(token: string){
    const data = {
      data: '',
    }
    return this.http.post(`${URL}/api/auth/logout/`, data);
  }
  add_hotel(fd:any){
    return this.http.post(`${URL}/api/hotel`,fd);
  }
  get_hotels(){
    return this.http.get<any>(`${URL}/api/hotel`);
  }
  add_department(fd:any){
    return this.http.post(`${URL}/api/department`, fd);
  }
  get_departments(){
    return this.http.get<any>(`${URL}/api/department`)
  }
  map_department(fd:any){
    return this.http.post(`${URL}/api/hotel_department`, fd);
  }
  get_map_departments(){
    return this.http.get<any>(`${URL}/api/hotel_department`);
  }
  add_items(fd:any){
    return this.http.post(`${URL}/api/item`, fd);
  }
  get_items(){
    return this.http.get<any>(`${URL}/api/item`);
  }
  add_user(fd:any){
    return this.http.post(`${URL}/api/user/reg`, fd);
  }
  get_users(){
    return this.http.get<any>(`${URL}/api/user/reg`);
  }
  get_items_dept(id:string){
    return this.http.get<any>(`${URL}/api/item?dept_id=${id}`);
  }
  add_item_received(data: any){
    const d = {
      data: data,
    }
    return this.http.post(`${URL}/api/op/item/received`, d);
  }
  get_item_received(){
    return this.http.get<any>(`${URL}/api/op/item/received`);
  }
}
