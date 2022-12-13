import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { CoreRoutingModule } from "./core-routing.module";

import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { GreetingComponent } from './components/greeting/greeting.component';
import { IonicModule } from "@ionic/angular";
import { BurgerMenuComponent } from "../features/burger-menu/burger-menu.component";


@NgModule({
    declarations: [
        MainLayoutComponent,
        HeaderComponent,
        FooterComponent,
        GreetingComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        CoreRoutingModule,
        IonicModule.forRoot(),
    ],
    exports: [CoreRoutingModule],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
})
export class CoreModule { }
