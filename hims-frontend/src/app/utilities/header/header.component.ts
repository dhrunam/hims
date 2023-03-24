import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { URLs } from 'src/environments/environment.prod';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private http: HttpService, private router: Router, private storage: LocalStorageService){}
  token:any = this.storage.getToken();
  logout(){
    this.http.post(URLs['logout'], {
      data: '',
    } ).subscribe({
      next: data => {
        this.router.navigateByUrl('/login');
        this.storage.clearSession();
      }
    })
  }
}
