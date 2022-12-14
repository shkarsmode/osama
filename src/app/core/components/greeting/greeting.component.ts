import { Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ChooseCityComponent } from '@features/choose-city/choose-city.component';
import { Observable, Subscription } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/ICategory';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit, OnDestroy {

  @ViewChild('cityWindowRef', { read: ViewContainerRef, static: true }) private containerRef!: ViewContainerRef;
  private componentRef!: ComponentRef<ChooseCityComponent>;

  suggestedCategories?: Observable<ICategory[]>;
  subscriptions?: Subscription[];

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSuggestedItems();
    this.listenToQueryParams();
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
