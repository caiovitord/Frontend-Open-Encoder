import { Injectable, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable()

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
 })

export class Interceptor implements HttpInterceptor {

  constructor(
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    req = this.addCORSHeader(req);
    return next.handle(req); 
  }


  private addCORSHeader(request: HttpRequest<any>){
    return request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }
    });
  }
}