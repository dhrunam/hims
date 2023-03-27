import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { URL } from "src/environment/environment.prod";
export interface MappedDepartments{
    id:number;
    hotel_id: number;
    hotel_name: string;
    departments: Array<{department_id: number, department_name: string}>;
}
@Injectable({providedIn: 'root'})
export class MapDepartmentService{
    constructor(private http: HttpClient){}
    get_mapped_departments(){
        return this.http.get<any>(`${URL}/api/hotel_department`)
        .pipe(map(respData => {
            let respArray: Array<MappedDepartments> = [];
            for(var i=0;i<respData.length;i++){
                const found = respArray.some(el => el.hotel_id === respData[i].hotel)
                if(found){
                    respArray.some(el => {
                        if(el.hotel_id === respData[i].hotel){
                            el.departments.push({
                                department_id: respData[i].related_department.id,
                                department_name: respData[i].related_department.name,
                            })
                        }
                    })   
                }
                else{
                    let d = {
                        id: respData[i].id,
                        hotel_id: respData[i].related_hotel.id,
                        hotel_name: respData[i].related_hotel.name,
                        departments: [
                            {
                                department_id: respData[i].related_department.id,
                                department_name: respData[i].related_department.name,
                            }
                        ],
                    }
                    respArray.push(d);
                }
            }
            return respArray;
        }));
    }
    map_department(fd: FormData){
        return this.http.post(`${URL}/api/hotel_department`, fd);
    }
    delete_map_department(fd: FormData){
        return this.http.delete(`${URL}/api/hotel_department/${fd.get('id')}`);
    }
}