import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingComponent, ProductComponent, ShoppingComponent } from '@componets';

import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
    { path: '', component: MainLayoutComponent, children: [
        { path: '', redirectTo: '/greeting', pathMatch: 'full' },
        { path: 'greeting', component: GreetingComponent },
        { path: 'shop/:city', component: ShoppingComponent },
        { path: 'product/:category/:id', component: ProductComponent },
        
        // {path: 'sumy', component: FooterComponent}
    ]},
    { path: '**', redirectTo: '/greeting' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
