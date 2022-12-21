import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICartSushi, ISushi } from '@interfaces';
import { CartService } from '@services/cart.service';
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
        private route: ActivatedRoute,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.getTagFromUrl();
    }

    public moveToProductPage(id: string): void {
        this.router.navigate(['/product', this.tag ?? 'suggested', id]);
    }

    public addProductToCart(): void {
        const item: ICartSushi = {
            id: this.item.id,
            name: this.item.name,
            price: this.item.price,
            img: this.item.img,
            category: this.tag!,
            counter: 1
        }

        this.cartService.addProductToCart(item)
        
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
