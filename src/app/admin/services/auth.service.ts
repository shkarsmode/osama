import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, OnInit, Optional } from "@angular/core";
import { IUser } from "@interfaces/IUser";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { IDENTITY_URL } from "src/environment/variables";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    private basePathIdentity: string = '/';

    constructor(
        @Optional() @Inject(IDENTITY_URL) identityUrl: string,
        private http: HttpClient
    ) {
        this.basePathIdentity = identityUrl;
    }

    ngOnInit(): void {

    }

    public login(user: IUser): Observable<any> {
        return this.http.post(`${this.basePathIdentity}?key=${environment.apiKey}`, user)
            .pipe(
                // tap(this.setToken),
                // catchError(this.handleError.bind(this))
            );
    }

    public isAuthenticated(): boolean {
        // return !!this.token
        return true;
    }

    public logout(): void {
        // this.setToken(null);

    }
}
