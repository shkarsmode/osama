import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (this.auth.isAuthenticated()) return true;
        else {
            this.router.navigate(['/admin', 'login'], {
                queryParams: {
                    isLoginAgain: true
                }
            });
            this.auth.logout();
            return false;
        }
    }

}