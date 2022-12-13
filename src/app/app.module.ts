import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BurgerMenuComponent } from './features/burger-menu/burger-menu.component';
import { CoreModule } from './core/core.module';
import { IonicModule } from '@ionic/angular';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    BurgerMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  entryComponents: [BurgerMenuComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
