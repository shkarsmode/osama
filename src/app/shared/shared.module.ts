import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from "@ionic/angular";
import { ItemsService } from "./services/items.service";
import { BASE_URL } from "src/environment/variables";
import { environment } from "src/environment/environment";
import { ChooseCityComponent } from "@features/choose-city/choose-city.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ChooseCityComponent
    ],
    imports: [
        IonicModule.forRoot(),
        HttpClientModule,
        FormsModule
    ],
    exports: [
        IonicModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        ItemsService,
        { provide: BASE_URL, useValue: environment.baseUrl }
    ],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
