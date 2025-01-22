import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: "http://localhost:3000/api" + request.url
    });
    const headers:any = {}
    if (this.authenticationService.isAuthenticated()) {
      headers['Authorization'] = this.authenticationService.accessToken
    }
    request = request.clone({ setHeaders: headers });
    return next.handle(request);
  }
}
