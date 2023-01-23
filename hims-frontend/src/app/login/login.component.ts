import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http/http.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private http: HttpService){}
  login(data:any){
    let fd = new FormData();
    fd.append('username', data.username);
    fd.append('password', data.password);
    fd.append('client', 'api');
    this.http.login(fd).subscribe({
      next: data => {
        console.log(data);
      }
    })  
  }
}
