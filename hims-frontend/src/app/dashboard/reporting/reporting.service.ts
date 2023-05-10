import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment.prod";
@Injectable({ providedIn: 'root' })
export class ReportingService{
    constructor(private http: HttpClient){}

    get_report(start_date: Date, end_date: Date, hotel_id: number, department_id: number, item_id?:number){
        return this.http.get<any>(`${URL}/api/report/hotel/item?start_date=${start_date}&end_date=${end_date}&hotel=${hotel_id}`);
    }
}