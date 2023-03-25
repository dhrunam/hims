import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { URL, API } from 'src/environment/environment.prod';
import { AuthResponse } from '../../shared/interfaces/auth-response.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = '/api/auth/';
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }
  onLogin(fd: FormData){
    return this.http.post<AuthResponse>(`${URL}${API.login}`, fd).pipe(tap(respData => {
      this.localStorageService.save(respData);
    }))
  }
  onLogout(){
    return this.http.post(`${URL}${API.logout}`, {});
  }
}
