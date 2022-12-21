import { Injectable, OnInit } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    ngOnInit(): void {

    }

    public isAuthenticated(): boolean {
        // return !!this.token
        return true;
    }

    public logout(): void {
        // this.setToken(null);

    }
}
