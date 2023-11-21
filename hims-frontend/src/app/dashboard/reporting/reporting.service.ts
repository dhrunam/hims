import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
@Injectable({ providedIn: 'root' })
export class ReportingService{
    constructor(private http: HttpClient){}

    get_report(start_date: Date, end_date: Date, hotel_id: number, department_id: number, item_id?:number){
        let params = new HttpParams();
        params = params.append('start_date', start_date.toString());
        params = params.append('end_date', end_date.toString());
        params = params.append('hotel', hotel_id);
        params = params.append('department', department_id);
        if(item_id){
            params = params.append('item', item_id)
        }
        return this.http.get<any>(`${URL}/api/report/hotel/item`, { params });
    }
}