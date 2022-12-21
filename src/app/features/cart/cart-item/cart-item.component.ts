import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartSushi } from '@interfaces';

@Component({
    selector: 'cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

    @Input() item!: ICartSushi;
    @Output() removeItem: EventEmitter<ICartSushi> = new EventEmitter();
    @Output() moveToProduct: EventEmitter<ICartSushi> = new EventEmitter();

    public sumOfmoney: number = 0;

    ngOnInit(): void {
        this.countSumOfOrder();
    }

    private countSumOfOrder(): void {
        this.sumOfmoney = this.item.counter * this.item.price;
    }

    public removeItemFromCart(): void {
        this.removeItem.next(this.item);
    }

    public moveToProductPage(): void {
        this.moveToProduct.next(this.item);
    }

}
