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
}
