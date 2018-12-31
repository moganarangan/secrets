import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddFieldComponent } from './add-field/add-field.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdatePinComponent } from './update-pin/update-pin.component';
import { PinComponent } from './pin/pin.component';

@NgModule({
  declarations: [AppComponent, AddFieldComponent, UpdateNameComponent, UpdatePinComponent, PinComponent],
  entryComponents: [UpdateNameComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
