import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(fd:any){
    return this.http.post(`${URL}/api/auth/login/`, fd);
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
}
