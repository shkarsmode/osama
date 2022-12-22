import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from "@ionic/angular";
import { ItemsService } from "./services/items.service";
import { BASE_URL, IDENTITY_URL } from "src/environment/variables";
import { environment } from "src/environment/environment";
import { ChooseCityComponent } from "@features/choose-city/choose-city.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SushiItemComponent } from "@features";
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [
        ChooseCityComponent,
        SushiItemComponent
    ],
    imports: [
        IonicModule.forRoot(),
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ],
    exports: [
        IonicModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SushiItemComponent,
        MatSnackBarModule
    ],
    providers: [
        ItemsService,
        { provide: BASE_URL, useValue: environment.baseUrl },
        { provide: IDENTITY_URL, useValue: environment.identityUrl },
    ],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
