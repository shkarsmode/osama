import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
;
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
    { path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: '/admin/main', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'main', component: AdminComponent, canActivate: [AuthGuard] },
    ]},
    { path: '**', redirectTo: '/admin' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
