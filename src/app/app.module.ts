import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteMock } from './database/sqlite-mock';

import { AppComponent } from './app.component';
import { LoginRegisterPage } from './login-register/login-register.page';
import { AppRoutingModule } from './app-routing.module';
import { AddFieldComponent } from './add-field/add-field.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdatePinComponent } from './update-pin/update-pin.component';
import { PinComponent } from './pin/pin.component';
import { SettingsPage } from './settings/settings.page';
import { SearchPage } from './search/search.page';
import { ViewPage } from './view/view.page';
import { EditPage } from './edit/edit.page';
import { AddPage } from './add/add.page';
import { HomePage } from './home/home.page';

import { CipherService } from './helpers/cipher.service';
import { UserService } from './services/user.service';
import { DatabaseService } from './database/database.service';
import { SecretTypesService } from './services/secret-types.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterPage,
    HomePage,
    AddPage,
    EditPage,
    ViewPage,
    SearchPage,
    SettingsPage,
    AddFieldComponent,
    UpdateNameComponent,
    UpdatePinComponent,
    PinComponent
  ],
  entryComponents: [UpdateNameComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    CipherService,
    UserService,
    DatabaseService,
    SecretTypesService,
    StatusBar,
    SplashScreen,
    {provide: SQLite, useClass: SQLiteMock},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
