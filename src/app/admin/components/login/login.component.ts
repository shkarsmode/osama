import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@interfaces/IUser';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm = new FormGroup({
        email: new FormControl<string>('zshkarrr@gmail.com', Validators.required),
        password: new FormControl<string>('291201', Validators.required)
    })
    public error$!: Subject<string>;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) this.router.navigate(['/admin', 'main'], {
            queryParams: {
                isAlreadyLogin: true
            }
        })
    }

    public submitForm(): void {
        if (this.loginForm.invalid) return;
        const user: IUser = {
            email: this.loginForm.get('email')!.value as string,
            password: this.loginForm.get('password')!.value as string,
            returnSecureToken: true
        }
        
        this.authService.login(user).subscribe(res => {
            console.log(res);
            if (this.authService.isAuthenticated()) {
                this.router.navigate(['/admin', 'main']);
            }
        })

        
    }
}
