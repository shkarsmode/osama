import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (this.auth.isAuthenticated()) {
            request = request.clone({
                setParams: {
                    auth: this.auth.token as string
                }
            })
        }

        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log('[Interceptor Error]: ', error);
                    if (error.status === 401) {
                        this.auth.logout();
                        this.router.navigate(['/admin', 'login'], {
                            queryParams: {
                                authFailed: true
                            }
                        });
                    }
                    return throwError(() => error);
                })
            )
    }
}
