import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http/http.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private http: HttpService, private router: Router, private storage: LocalStorageService){}
  login(data:any){
    let fd = new FormData();
    fd.append('username', data.username);
    fd.append('password', data.password);
    fd.append('client', 'api');
    this.http.login(fd).subscribe({
      next: data => {
        this.storage.saveToken(data.token);
        this.storage.saveUser(JSON.stringify(data.user));
        window.location.href="/dashboard";
      },
      error: err => {
        alert('Invalid Credentials');
      }
    })  
  }
}
