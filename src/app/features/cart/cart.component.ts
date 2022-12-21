import { Component, OnInit } from '@angular/core';
import { openCart, showShadow } from '@animations';
import { ICartSushi } from '@interfaces';
import { CartService } from '@services/cart.service';
import { BehaviorSubject, Subscription } from 'rxjs';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    animations: [openCart, showShadow]
})
export class CartComponent implements OnInit{

    public counter: number = 0;
    public itemsToBuy: ICartSushi[] = [];
    public isOpenCart: boolean = false;

    private gettingCounterSubject$!: BehaviorSubject<number>;
    private gettingItemsSubject$!: BehaviorSubject<ICartSushi[]>;
    private subscriptions: Subscription[] = [];

    constructor(
        private cartService: CartService
    ) {
        
    }

    ngOnInit(): void {
        this.cartService.getItemsFromLocalStorage();
        this.subscribeOnCounterSubject();
        this.subscribeOnItemsSubject();
    }

    private subscribeOnCounterSubject(): void {
        this.gettingCounterSubject$ = this.cartService.gettingCounterSubject$;
        const sub = this.gettingCounterSubject$.subscribe(num => this.counter = num);

        this.subscriptions.push(sub);
    }

    private subscribeOnItemsSubject(): void {
        this.gettingItemsSubject$ = this.cartService.gettingItemsSubject$;
        const sub = this.gettingItemsSubject$.subscribe(cartItems => this.itemsToBuy = cartItems);

        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
