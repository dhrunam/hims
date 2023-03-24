import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { URLs } from "src/environments/environment.prod";
import { HttpService } from "../http/http.service";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpService, private localStorage: LocalStorageService){}
    login(data:any){
        return this.http.post(URLs['login'], data).pipe(
            tap(resp => {
                this.localStorage.saveToken(resp.token);
                this.localStorage.saveData(JSON.stringify(resp.user));
            })
        )
    }
    logout(){
        return this.http.post(URLs['logout'],{data:''}).pipe(tap(() => this.localStorage.clearSession()));
    }
}