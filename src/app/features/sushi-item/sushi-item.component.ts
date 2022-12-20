import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ISushi } from '@interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sushi-item',
    templateUrl: './sushi-item.component.html',
    styleUrls: ['./sushi-item.component.scss']
})
export class SushiItemComponent implements OnInit, OnDestroy {

    @Input() item!: ISushi;

    private subscriptions: Subscription[] = [];
    private tag?: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getTagFromUrl();
    }

    public moveToProductPage(id: string): void {
        this.router.navigate(['/product', this.tag, id]);
    }

    public addProductToCart(id: string): void {
        console.log('product card', id);
    }

    private getTagFromUrl(): void {
        const sub = this.route.queryParams
            .subscribe((params: Params) => this.tag = params['tag']);

        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
