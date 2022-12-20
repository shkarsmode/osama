import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISushi } from '@interfaces';
import { ItemsService } from '@services';
import { forkJoin, Observable, of, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy{

    private id!: number;
    private category!: string;
    private subscriptions: Subscription[] = [];
    public item?: ISushi;

    constructor(
        private itemService: ItemsService,
        private route: ActivatedRoute
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

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
