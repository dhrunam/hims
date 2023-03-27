import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/shared/interfaces/auth-response.interface';
import * as CryptoJS from 'crypto-js';
import { KEY } from 'src/environment/environment.prod';
const TOKEN = 'token';
const EXPIRY = 'expiry';
const USER_DETAILS = 'userDetails';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }
  public save(data: AuthResponse){
    if(window.localStorage.getItem(TOKEN) || window.localStorage.getItem(EXPIRY) || window.localStorage.getItem(USER_DETAILS)){
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(EXPIRY);
      window.localStorage.removeItem(USER_DETAILS);
    }
    window.localStorage.setItem(TOKEN, data.token);
    window.localStorage.setItem(EXPIRY, data.expiry.toString());
    window.localStorage.setItem(USER_DETAILS, CryptoJS.AES.encrypt(JSON.stringify(data.user), KEY).toString());
  }
  public getUserName(){
    let data: any = window.localStorage.getItem(USER_DETAILS);
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.username;
  }
  public getToken(){
    return window.localStorage.getItem(TOKEN);
  }
  public clearSession(){
    window.localStorage.clear();
  }
  public getRole(){
    let data: any = window.localStorage.getItem(USER_DETAILS);
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_groups[0].id;
  }
}
