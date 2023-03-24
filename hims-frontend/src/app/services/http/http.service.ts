import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL } from 'src/environments/environment.prod';

interface queryParams{
  url: string,
  q_params?: Array<any>
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  post(url:string, fd:any)
  {
    return this.http.post<any>(`${URL}${url}/`, fd);
  }

  get(meta_data: queryParams){
    
    let params=this.make_q_param_url(meta_data.q_params)
    
    return this.http.get<any>(`${URL}${meta_data.url}`, { params: params});
  }

  make_q_param_url(q_param?:Array<any>)
  {
    let params = new HttpParams();
    if(q_param !== undefined && q_param.length>0)
    {
      q_param?.forEach((element,index) => {
        params.append(element['name'],element['value'])
      });
    }

    return params;

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
  add_item_damaged(data: any){
    const d = {
      data: data,
    }
    return this.http.post(`${URL}/api/op/item/damage`, d);
  }
  add_item_transferred(data: any){
    const d = {
      data: data,
    }
    return this.http.post(`${URL}/api/op/item/transfer`, d);
  }
  add_item_returned(data: any){
    const d = {
      data: data,
    }
    return this.http.post(`${URL}/api/op/item/return`, d);
  }
  get_item_received(id: string){
    return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
  }
  get_item_returned(id: string){
    return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
  }
  get_item_damaged(id: string){
    return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
  }
  get_item_transferred(id: string){
    return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
  }
}
