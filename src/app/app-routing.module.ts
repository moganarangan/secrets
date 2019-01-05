import { ViewPage } from './view/view.page';
import { AddPage } from './add/add.page';
import { SettingsPage } from './settings/settings.page';
import { HomePage } from './home/home.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterPage } from './login-register/login-register.page';
import { EditPage } from './edit/edit.page';
import { SearchPage } from './search/search.page';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'login-register', component: LoginRegisterPage },
  { path: 'settings', component: SettingsPage },
  { path: 'add', component: AddPage },
  { path: 'edit', component: EditPage },
  { path: 'view', component: ViewPage },
  { path: 'search', component: SearchPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
