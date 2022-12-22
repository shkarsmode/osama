import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ISushi } from '@interfaces';
import { ItemsService } from '@services';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-create-sushi',
    templateUrl: './create-sushi.component.html',
    styleUrls: ['./create-sushi.component.scss']
})
export class CreateSushiComponent implements OnInit {

    public sushiForm = new FormGroup({
        name: new FormControl('', Validators.required),
        img: new FormControl('', Validators.required),
        bigImg: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        composition: new FormControl('', Validators.required),
        oldPrice: new FormControl('')
    })

    constructor(
        private authService: AuthService,
        private router: Router,
        private itemsService: ItemsService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {}

    public submitForm() {
        if (this.sushiForm.invalid) return;
        
        const item = {
            name: this.getFormValue('name'),
            img: this.getFormValue('img'),
            bigImg: this.getFormValue('bigImg'),
            price: this.getFormValue('price'),
            weight: this.getFormValue('weight'),
            composition: this.getFormValue('composition'),
            oldPrice: this.getFormValue('oldPrice') ?? null
        }

        const category: string = this.getFormValue('category');

        this.itemsService.createNewSushi(item, category).subscribe(res => {
            
            this.sushiForm.reset();

            this.snackBar.open('You`re product was successful uploaded', 'Close', {
                duration: 2500,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });
            
        })
        
        

    }

    private getFormValue(key: string) {
        return this.sushiForm.get(key)?.value;
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['/admin', 'login']);
    }
}
