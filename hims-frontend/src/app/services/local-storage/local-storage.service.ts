import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { KEY } from 'src/environments/environment.prod';
const TOKEN = 'token';
const DETAILS = 'details';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }
  public saveToken(token: string){
    if(window.localStorage.getItem(TOKEN)){
      window.localStorage.removeItem(TOKEN);
    }
    window.localStorage.setItem(TOKEN, token);
  }
  public getToken(){
    return window.localStorage.getItem(TOKEN);
  }
  public clearSession(){
    window.localStorage.clear();
  }
  public saveUser(details:any){
    if(window.localStorage.getItem(DETAILS)){
      window.localStorage.removeItem(DETAILS);
    }
    window.localStorage.setItem(DETAILS, CryptoJS.AES.encrypt(details, KEY).toString());
  }
  public getUserGroup(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_groups[0].id;
  }
  public getUserData(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data;
  }
  public getHotelName(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_profile[0].related_hotel.name;
  }
  public getDepartmentName(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_profile[0].related_department.name;
  }
  public getDepartmentId(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_profile[0].related_department.id;
  }
  public getHotelId(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_profile[0].related_hotel.id;
  }
  public getUserName(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.username;
  }

  //=======

  
  public saveData(data: any){
    if(window.localStorage.getItem('details')){
      window.localStorage.removeItem('details');
    }
    window.localStorage.setItem('details', CryptoJS.AES.encrypt(data, KEY).toString());
  }
  
  
  public getPropertyId(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_profile[0].property;
  }
  public getRoleId(){
    let data: any = window.localStorage.getItem('details');
    let res_data: any = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data.related_groups[0].id;
  }



}
