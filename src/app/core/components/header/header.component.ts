import { 
    Component, 
    ComponentRef, 
    OnInit, Output, 
    ViewChild, 
    ViewContainerRef, 
    EventEmitter, 
    OnDestroy
} from '@angular/core';
import { ActivatedRoute, Params, Router, Scroll } from '@angular/router';

import { BurgerMenuComponent } from '@features';
import { IInfoCity, ISushi, IShortProductInfo } from '@interfaces';
import { ItemsService } from '@services';

import { Subscription, filter, BehaviorSubject } from 'rxjs';

const enum Flow {
    'greeting',
    'shopping',
    'product'
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isOpenBurgerMenu: boolean = false;

    @ViewChild('burgerRef', { read: ViewContainerRef })
    private burgerRef!: ViewContainerRef;
    private componentRef!: ComponentRef<BurgerMenuComponent>;
    private subscriptions: Subscription[] = [];
    private gettingShortInfoSubject!: BehaviorSubject<IShortProductInfo>;

    public city!: string | null;
    public tag!: string | null;
    public flow: Flow = Flow.greeting;

    public info?: IInfoCity | null;
    public productInfo?: IShortProductInfo;
    public product?: ISushi | null;
    public img = 'https://osama.com.ua/wp-content/uploads/2021/12/IMG_7279111-2-scaled-1-2048x1195.jpg';

    @Output() moveViewToItems: EventEmitter<void> = new EventEmitter();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private itemsService: ItemsService
    ) {
        this.gettingShortInfoSubject = itemsService.shortInfoSubject;
    }

    ngOnInit(): void { 
        this.subscribeOnSubjectCity();
        this.determineTag();
        this.listenParamsToUpdateStatusOfFlow();
        this.listenShortProductInfo();
    }

    public toggleBurgerMenu(): void {
        this.isOpenBurgerMenu = !this.isOpenBurgerMenu;
        (this.isOpenBurgerMenu ? this.openBurgerMenu : this.closeBurgerMenu)
            .call(this);
    }

    public moveToSuggested(): void {
        this.moveViewToItems.emit();
    }

    public moveToGreetingComponent(): void {
        this.router.navigate(['greeting']);
    }

    private getInfoByCity(): void {
        const sub = this.itemsService.getInfoByCity(this.city!)
            .subscribe((info: IInfoCity) => {
                this.info = info;
                this.flow = Flow.shopping;
            });

        this.subscriptions.push(sub);
    }

    private closeBurgerMenu(): void {
        this.componentRef.instance.isClosingAnim = true;
    }

    private openBurgerMenu(): void {
        this.burgerRef.clear();
        this.componentRef = this.burgerRef.createComponent(BurgerMenuComponent);
    }

    private clearInfo(): void {
        this.info = null;
    }

    private subscribeOnSubjectCity(): void {
        const sub = this.itemsService.citySubject
            .subscribe(this.determineCityForChanges.bind(this));

        this.subscriptions.push(sub);
    }

    private determineCityForChanges(city: string | null): void {
        this.city = city;
        (city ? this.getInfoByCity : this.clearInfo).call(this);
    }

    private determineTag(): void {
        const sub = this.route.queryParams
            .subscribe((params: Params) => this.tag = params['tag']);

        this.subscriptions.push(sub);
    }

    private listenParamsToUpdateStatusOfFlow(): void {
        const sub = this.router.events
            .pipe(filter(event => event instanceof Scroll))
            .subscribe(this.updateFlowStatus.bind(this));

        this.subscriptions.push(sub);
    }

    private updateFlowStatus(params: any): void {
        const url = params.routerEvent.url;
        
        if (url.includes('greeting')) this.flow = Flow.greeting;
        else if (url.includes('shop')) this.flow = Flow.shopping;
        else this.flow = Flow.product;
    }

    private listenShortProductInfo() {
        const sub = this.gettingShortInfoSubject?.subscribe((info: IShortProductInfo) => {
            this.productInfo = info;
        })

        this.subscriptions.push(sub);
    }
    

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
}
