import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, OnInit, Optional } from "@angular/core";
import { FbAuthResponse } from "@interfaces/FbAuthResponse";
import { IUser } from "@interfaces/IUser";
import { catchError, Observable, of, Subject, tap } from "rxjs";
import { environment } from "src/environment/environment";
import { IDENTITY_URL } from "src/environment/variables";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    private basePathIdentity: string = '/';
    public error$: Subject<string> = new Subject();

    constructor(
        @Optional() @Inject(IDENTITY_URL) identityUrl: string,
        private http: HttpClient
    ) {
        this.basePathIdentity = identityUrl;
    }

    ngOnInit(): void {}

    public get token(): string | null {
        const expDate = new Date(localStorage.getItem('fb-token-exp') as string);
        if (new Date() > expDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    public login(user: IUser): Observable<any> {
        return this.http.post<FbAuthResponse>(`${this.basePathIdentity}?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    public isAuthenticated(): boolean {
        return !!this.token;
    }

    public logout(): void {
        this.setToken(null);
        
    }

    private handleError(error: HttpErrorResponse, caught: Observable<any>) {
        const message = error.error.error.message;
        console.log(error.error.error);

        switch (message) {
            case 'INVALID_PASSWORD':
                this.error$.next('invalid password')
                break;
            case 'INVALID_EMAIL':
                this.error$.next('invalid email')
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('email not found')
                break;
        }

        return '';

    }

    private setToken(response: FbAuthResponse | null): void {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            console.log('expDate', expDate);
            console.log('exp', +response.expiresIn);

            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else { 
            localStorage.setItem('fb-token', '');
            localStorage.setItem('fb-token-exp', '');
        }

    }
}
