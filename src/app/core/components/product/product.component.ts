import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICartSushi, ISushi } from '@interfaces';
import { ItemsService } from '@services';
import { CartService } from '@services/cart.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    @ViewChild('backImg') backImg!: ElementRef;

    private id!: number;
    private category!: string;
    private subscriptions: Subscription[] = [];
    public item?: ISushi;
    public countOfItem: number = 1;

    constructor(
        private itemService: ItemsService,
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private cartService: CartService
    ) { }

    /**
     * * Make feature with img(scaling)
     * 
     * 
     */

    ngOnInit(): void {
        this.getIdOfProductFromUrl();
        this.getCategoryFromUrl();
        this.getProductById();
    }

    private getIdOfProductFromUrl(): void {
        const sub = this.route.params.subscribe(params => {
            this.id = Number.parseInt(params['id']);
        });
        
        this.subscriptions.push(sub);
    }

    private getCategoryFromUrl(): void {
        const sub = this.route.params.subscribe(params => {
            this.category = params['category'];
        });

        this.subscriptions.push(sub);
    }

    private getProductById(): void {
        this.itemService.getProductByIdAndCategory(
            this.category, 
            this.id
        ).subscribe((item: ISushi) => {
            this.item = item;
        });
    }

    public moveBackgroundPicture(event: any): void {
        const posX = event.offsetX;
        const posY = event.offsetY;

        const sizeX = this.backImg.nativeElement.clientWidth;
        const sizeY = this.backImg.nativeElement.clientHeight;

        const sizeXPer = 100 * posX / sizeX;
        const sizeYPer = 100 * posY / sizeY;

        this.renderer.setStyle(this.backImg.nativeElement, 'background-position', `${sizeXPer}% ${sizeYPer}%`);       
    }

    public incrementOfItemCount(): void {
        this.countOfItem = this.countOfItem > 0 ? this.countOfItem + 1 : 1; 
    }

    public decrementOfItemCount(): void {
        this.countOfItem = this.countOfItem <= 1 ? 1 : this.countOfItem - 1;
    }

    public addItemToCart(): void {
        if (this.countOfItem < 1) return;
        
        const item: ICartSushi = {
            id: this.item!.id,
            name: this.item!.name,
            price: this.item!.price,
            img: this.item!.img,
            category: this.category,
            counter: this.countOfItem
        }
        this.cartService.addProductToCart(item);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
