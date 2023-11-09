import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.localStorageService.getToken();
    if(token != null){
      authRequest = request.clone({ headers: new HttpHeaders().set('Authorization', `Token ${token}`)});
    }
    return next.handle(authRequest).pipe(catchError((err: HttpErrorResponse) => {
      if(err.error.detail == 'Invalid token.' || err.error.detail == 'The given token has expired.'){
        alert('Session Expired !! Please login again');
        window.location.href = '/';
        this.localStorageService.clearSession();
      }
      return throwError(() => err)
    }));
  }
}
