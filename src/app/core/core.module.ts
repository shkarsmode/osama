import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreRoutingModule } from './core-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {
  GreetingComponent,
  FooterComponent,
  HeaderComponent,
} from './components';
import { SharedModule } from '../shared/shared.module';
import { ShoppingComponent } from './components/shopping/shopping.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    GreetingComponent,
    ShoppingComponent,
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
