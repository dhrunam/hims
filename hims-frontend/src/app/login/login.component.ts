import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import { AuthResponse } from '../shared/interfaces/auth-response.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private authService: AuthService, private router: Router){}
  login(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('username', data.value.username);
      fd.append('password', data.value.password);
      fd.append('client', 'api');
      this.authService.onLogin(fd).subscribe({
        next: (data:AuthResponse) => this.router.navigate(['/dashboard']),
        error: err => console.log(err),
      })
    } 
  }
}
