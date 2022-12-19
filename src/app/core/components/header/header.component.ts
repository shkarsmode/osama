import { 
    Component, 
    ComponentRef, 
    OnInit, Output, 
    ViewChild, 
    ViewContainerRef, 
    EventEmitter, 
    OnDestroy 
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BurgerMenuComponent } from '@features';
import { IInfoCity } from '@interfaces';
import { ItemsService } from '@services';

import { Subscription } from 'rxjs';



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
    public city!: string | null;
    public tag!: string | null;

    public info?: IInfoCity | null;
    public img = 'https://osama.com.ua/wp-content/uploads/2021/12/IMG_7279111-2-scaled-1-2048x1195.jpg';

    @Output() moveViewToItems: EventEmitter<void> = new EventEmitter();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private itemsService: ItemsService
    ) {}

    ngOnInit(): void { 
        this.subscribeOnSubjectCity();
        this.determineTag();
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
            .subscribe((info: IInfoCity) => this.info = info);

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

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
}
