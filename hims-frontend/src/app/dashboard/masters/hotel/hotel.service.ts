import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { URL } from "src/environment/environment.prod";
import { DepartmentService } from "../department/department.service";

@Injectable({providedIn: 'root'})
export class HotelService{
    constructor(private http: HttpClient, private departmentService: DepartmentService){}
    add_hotel(fd:FormData){
        return this.http.post(`${URL}/api/hotel`,fd);
    }
    update_hotel(fd:FormData){
        return this.http.patch(`${URL}/api/hotel/${fd.get('id')}`,fd);
    }
    get_hotels(){
        return this.http.get<any>(`${URL}/api/hotel`);
    }
    get_hotel(id:number){
        return this.http.get<any>(`${URL}/api/hotel/${id}`)
                        .pipe(map(respData => {
                            let respHotelData:any;
                            let departments: Array<any> = [];
                            let selectedDepartments: Array<any> = [];
                            this.departmentService.get_departments().subscribe({
                                next: data => {
                                    departments = data;
                                    for(var i=0; i<departments.length; i++){
                                        for(var j=0; j<respData.departments.length; j++){
                                            if( respData.departments[j] && respData.departments[j].department === departments[i].id){
                                                selectedDepartments.push({
                                                    department_id: departments[i].id,
                                                    is_selected: true,
                                                })
                                            }
                                        }
                                        const found = selectedDepartments.some(d => d.department_id === departments[i].id);
                                        if(!found){
                                            selectedDepartments.push({
                                                department_id: departments[i].id,
                                                is_selected: false,
                                            })
                                        }
                                    }
                                }
                            })
                            
                            respHotelData = {
                                hotel_id: respData.id,
                                hotel_name: respData.name,
                                hotel_short_name: respData.short_name,
                                departments: selectedDepartments,
                            }
                            console.log(respHotelData);
                            return respHotelData;
                        }));
    }
    delete_hotels(fd:FormData){
        return this.http.delete(`${URL}/api/hotel/${fd.get('id')}`);
    }
}