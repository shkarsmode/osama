import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { CoreRoutingModule } from './core-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {
  GreetingComponent,
  FooterComponent,
  HeaderComponent,
} from './components';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    GreetingComponent,
  ],
  imports: [CommonModule, NgbModule, CoreRoutingModule, IonicModule.forRoot()],
  exports: [CoreRoutingModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class CoreModule {}
