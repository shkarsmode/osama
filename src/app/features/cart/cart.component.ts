import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public sumOfItems: number = 0;

    private isFirstEntering: boolean = true;
    private gettingCounterSubject$!: BehaviorSubject<number>;
    private gettingItemsSubject$!: BehaviorSubject<ICartSushi[]>;
    private subscriptions: Subscription[] = [];

    constructor(
        private cartService: CartService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cartService.getItemsFromLocalStorage();
        this.subscribeOnCounterSubject();
        this.subscribeOnItemsSubject();
        this.updateSumOfItems();
    }

    public openOrderPreview(): void {
        this.updateSumOfItems();
        this.isOpenCart = true;
    }

    private subscribeOnCounterSubject(): void {
        this.gettingCounterSubject$ = this.cartService.gettingCounterSubject$;
        const sub = this.gettingCounterSubject$.subscribe(num => this.counter = num);

        this.subscriptions.push(sub);
    }


    private subscribeOnItemsSubject(): void {
        this.gettingItemsSubject$ = this.cartService.gettingItemsSubject$;
        const sub = this.gettingItemsSubject$.subscribe(cartItems => {
            this.itemsToBuy = cartItems;
            this.updateSumOfItems();
            if (!this.isFirstEntering) this.isOpenCart = true;
            else this.isFirstEntering = false;
        });

        this.subscriptions.push(sub);
    }

    public moveToProductPage(item: ICartSushi): void {
        this.router.navigate(['product', item.category, item.id]);
        this.isOpenCart = false;
    }

    public updateSumOfItems(): void {
        this.sumOfItems = 0;
        this.itemsToBuy.forEach(item => 
            this.sumOfItems += item.price*item.counter);
    }

    public removeItemFromCart(item: ICartSushi): void {
        this.cartService.removeProductFromCart(item);
        this.updateSumOfItems();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
