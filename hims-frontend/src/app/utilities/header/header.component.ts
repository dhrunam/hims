import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private http: HttpService, private router: Router, private storage: LocalStorageService){}
  token:any = this.storage.getToken();
  logout(){
    this.http.logout(this.token).subscribe({
      next: data => {
        this.router.navigateByUrl('/login');
        this.storage.clearSession();
      }
    })
  }
}
