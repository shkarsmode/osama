import { Injectable, OnInit } from '@angular/core';
import { ICartSushi, ISushi } from '@interfaces';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private counterOfItemsByType: number = 0;
    private itemsToBuy: ICartSushi[] = [];
    public gettingCounterSubject$: BehaviorSubject<number> = new BehaviorSubject(this.counterOfItemsByType);
    public gettingItemsSubject$: BehaviorSubject<ICartSushi[]> = new BehaviorSubject(this.itemsToBuy);

    constructor() { }

    public addProductToCart(item: ICartSushi): void {
        if (this.itemsToBuy.length == 0) this.itemsToBuy.push(item);
        else {
            const arrOfNames = this.itemsToBuy.map(item => item.name)
                .filter((cat, index, array) => array
                .indexOf(cat) == index);

            if (arrOfNames.indexOf(item.name) == -1) {
                this.itemsToBuy.push(item);
            } else {
                this.itemsToBuy = this.itemsToBuy.map(sushi => {
                    if (sushi.name == item.name) {
                        return {
                        ...sushi,
                        counter: sushi.counter + item.counter
                        }
                    } else return sushi; 
                })
            }
        }

        this.gettingItemsSubject$.next(this.itemsToBuy);
        this.countItemsByType();
        this.setItemsInLocalStorage();
    }

    // public get counterOfItems(): number {
    //     return this.counterOfItemsByType;
    // }

    private countItemsByType(): void {
        this.counterOfItemsByType = this.itemsToBuy.length;
        this.gettingCounterSubject$.next(this.counterOfItemsByType);
        
    }

    private setItemsInLocalStorage(): void {
        localStorage.setItem('itemsToBuy', JSON.stringify(this.itemsToBuy));
    }

    public getItemsFromLocalStorage(): void {
        const items = localStorage.getItem('itemsToBuy');

        if (items && items?.length > 0) {
            this.itemsToBuy = JSON.parse(items);
            this.countItemsByType();
            this.gettingItemsSubject$.next(this.itemsToBuy);
        }
    }
}
