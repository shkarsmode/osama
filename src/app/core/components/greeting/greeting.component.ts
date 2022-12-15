import { Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChooseCityComponent } from '@features';
import { ICategory } from '@interfaces';
import { ItemsService } from '@services';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit, OnDestroy {

    @ViewChild('cityWindowRef', { read: ViewContainerRef, static: true }) private containerRef!: ViewContainerRef;
    private componentRef!: ComponentRef<ChooseCityComponent>;

    private subscriptions?: Subscription[];
    private citySubject?: Subject<string | null>;
    public suggestedCategories?: Observable<ICategory[]>;

    constructor(
        private itemsService: ItemsService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getSuggestedItems();
        this.listenToQueryParams();
        this.reportAboutEnteringGreeting();
    }

    private reportAboutEnteringGreeting(): void {
        this.citySubject = this.itemsService.citySubject ?? null;
        this.citySubject?.next(null);
    }

    private getSuggestedItems() {
        this.suggestedCategories = this.itemsService.getSuggestedCategories();
    }

    private listenToQueryParams(): void {
        const sub = this.route.queryParams.subscribe((params: Params) => {
            if (!params['tag']) return;
            this.openChoosingCityWindow();
        });

        this.subscriptions?.push(sub);
    }

    public chooseTagWithCity(tag: string | null): void {
        this.router.navigate(['greeting'], {
            queryParams: { tag }
        });
    }

    private openChoosingCityWindow(): void {
        this.containerRef?.clear();
        this.componentRef = this.containerRef.createComponent(ChooseCityComponent);
        const sub = this.componentRef.instance.close.subscribe(_ => {
            this.containerRef.clear();
            this.chooseTagWithCity(null);
        });

        this.subscriptions?.push(sub);
    }

    ngOnDestroy(): void {
        console.log(this.subscriptions);
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}
