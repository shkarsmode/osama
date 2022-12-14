import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreRoutingModule } from './core-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { SharedModule } from '../shared/shared.module';
import { 
  BreadcrumbsComponent, 
  BurgerIconComponent, 
  CartComponent, 
  CartItemComponent, 
  SocialComponent,
} from '@features';
import { 
  FooterComponent, 
  GreetingComponent, 
  HeaderComponent, 
  ShoppingComponent 
} from '@componets';
import { ProductComponent } from './components/product/product.component';
import { HowToOrderComponent } from '@features/how-to-order/how-to-order.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    GreetingComponent,
    ShoppingComponent,
    SocialComponent,
    BurgerIconComponent,
    BreadcrumbsComponent,
    ProductComponent,
    CartComponent,
    CartItemComponent,
    HowToOrderComponent
  ],
  imports: [
    NgbModule, 
    CoreRoutingModule, 
    SharedModule,
    CommonModule
  ],
  exports: [CoreRoutingModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class CoreModule { }
