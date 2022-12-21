import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

    @Input() city!: string | null;
    @Input() tag!: string | null;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void { }

    moveToMainPage(): void {
        this.router.navigate(['/']);
    }

    moveToShopInCurrentCity(): void {
        if (this.tag)
            this.router.navigate(['shop', this.city], {
                queryParams: {
                    tag: 'suggested'
                }
            });
    }
    
}
