import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private store: LocalStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authenticationService.userValue;
        const token = this.store.getItem('token');
        const isLoggedIn = user && token;
        const isApiUrl = request.url.startsWith(environment.apiUrls.master);
        if (isLoggedIn && isApiUrl) {
            const headers = new HttpHeaders().set("x-access-token",token);
            request = request.clone({ headers: headers });
        }
        return next.handle(request);
    }
}