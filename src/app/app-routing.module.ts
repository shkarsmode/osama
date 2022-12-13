import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
