
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent, LoginComponent } from '.';


import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthGuard } from './helpers/auth.guard';

// import { AdminComponent, LoginComponent } from '@admin';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    NgbModule, 
    AdminRoutingModule, 
    SharedModule,
    CommonModule,
  ],
  exports: [
    AdminRoutingModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard],
})
export class AdminModule { }
