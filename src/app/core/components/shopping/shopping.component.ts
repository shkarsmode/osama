import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICategory, ISushi } from '@interfaces';

import { ItemsService } from '@services';

import { Observable, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping',
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnDestroy{

    private citySubject!: Subject<string | null>;
    private subscriptions: Subscription[] = [];
    private city?: string | null;
    public tag?: string | null;
    public sushi?: ISushi[];
    public suggestedCategories!: Observable<ICategory[]>;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private itemsService: ItemsService
    ) {
        this.citySubject = this.itemsService.citySubject ?? null;
    }

    ngOnInit(): void {
        this.getCityName();
        this.getTagFromUrl();
        this.getSuggestedCategories();
    }

    private getTagFromUrl(): void {
        const sub = this.route.queryParams.subscribe((params: Params) => {
            this.tag = params['tag'] ?? 'suggested';
            this.getSushiByTag(this.tag!);
        });

        this.subscriptions.push(sub);
    }

    private getSushiByTag(tag: string): void {
        const sub = this.itemsService.getSushiByCategory(tag)
            .subscribe(
                sushi => this.sushi = sushi,
                error => {
                    this.sushi = [];
                });
        
        this.subscriptions.push(sub);
    }

    private getSuggestedCategories(): void {
        this.suggestedCategories = this.itemsService.getSuggestedCategories();
    }


    private getCityName() {
        const sub = this.route.params.subscribe(params => {
            this.city = params['city'] ?? null;
            this.citySubject.next(this.city!);
        });

        this.subscriptions.push(sub);
    }

    public isActiveCategory(tag: string, index: number): boolean {
        return this.tag ? (this.tag == tag ? true : false) : index == 0;
    }

    public chooseCategory(tag: string): void {
        this.tag = tag;
        this.router.navigate(['shop', this.city], {
            queryParams: { tag }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}
