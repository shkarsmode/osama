import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '@services';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

    public items: any = [];
    public categories: any = [];
    public activeCategory: string = '';
    private subscriptions: Subscription[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private itemsService: ItemsService
    ) {}

    ngOnInit(): void {
        this.subscribeOnGettingAllSushi();
    }

    public getSushiByCategory(category: string): void {
        if (this.activeCategory == category) {
            this.activeCategory = '';
            this.items = [];
            return;
        }
        const sub = this.itemsService.getSushiByCategory(category)
            .subscribe(items => {
                this.items = items;
                this.activeCategory = category;
            });

        this.subscriptions.push(sub);
    }

    private subscribeOnGettingAllSushi(): void {
        const sub = this.itemsService.getAllSushi().subscribe(items => {
            this.categories = items.map((item: any) => {
                return {
                    name: item.name,
                    count: Object.keys(item).length - 1
                }
            });
        });

        this.subscriptions.push(sub);
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['/admin', 'login']);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
