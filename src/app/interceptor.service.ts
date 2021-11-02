import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {catchError, tap} from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor( private spinner: NgxSpinnerService , private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = sessionStorage.getItem('currentUser');
    this.spinner.show();
    return next.handle(req.clone({ headers: req.headers.set('Authorization', `${token}`) })).pipe(
      tap(evt=>{
        if(evt instanceof HttpResponse){
          this.spinner.hide();
        }
      }),
      catchError((error:any)=>{
        if(error.statusText!='Unknown Error'){
          this.spinner.hide();
        }
        if(error.status==401){
          console.log("Inside 401");
          this.router.navigate(['']);
        }
        return throwError(error);
      })
    );
  }
}

