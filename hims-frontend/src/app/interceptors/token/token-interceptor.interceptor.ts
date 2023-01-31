import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import {catchError} from "rxjs/operators";
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private local_storage: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let authReq = request;
    const token = this.local_storage.getToken();
    if (token != null) {
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Token ' + token) });
    }
    return next.handle(authReq).pipe(catchError((err:any)=>{
      // alert('Invalid Session !!!');
      // window.location.href = '/login';
      // this.local_storage.clearSession();
      return throwError(() => err);
    }));
  }
}
export const tokenInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }
];
