import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddFieldComponent } from './add-field/add-field.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdatePinComponent } from './update-pin/update-pin.component';
import { PinComponent } from './pin/pin.component';

import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    AddFieldComponent,
    UpdateNameComponent,
    UpdatePinComponent,
    PinComponent
  ],
  entryComponents: [UpdateNameComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__secretsdb',
      driverOrder: ['sqlite', 'localstorage']
    })
  ],
  providers: [
    UserService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
