import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreRoutingModule } from './core-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { SharedModule } from '../shared/shared.module';
import { 
  BreadcrumbsComponent, 
  BurgerIconComponent, 
  SocialComponent, 
  SushiItemComponent
} from '@features';
import { 
  FooterComponent, 
  GreetingComponent, 
  HeaderComponent, 
  ShoppingComponent 
} from '@componets';


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
    SushiItemComponent
  ],
  imports: [
    CommonModule, 
    NgbModule, 
    CoreRoutingModule, 
    SharedModule
  ],
  exports: [CoreRoutingModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class CoreModule { }
