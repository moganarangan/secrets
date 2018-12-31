import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'initial', pathMatch: 'full' },
  { path: 'initial', loadChildren: './initial/initial.module#InitialPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login-register', loadChildren: './login-register/login-register.module#LoginRegisterPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'add', loadChildren: './add/add.module#AddPageModule' },
  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
  { path: 'view', loadChildren: './view/view.module#ViewPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
