import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BurgerMenuComponent } from '@features/burger-menu';
import { SharedModule } from './shared/shared.module';
import { SocialComponent } from './features/social/social.component';
import { BurgerIconComponent } from './features/burger-icon/burger-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    BurgerMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [BurgerMenuComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
