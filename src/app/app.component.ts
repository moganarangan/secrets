import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

import { DatabaseService } from './database/database.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbService: DatabaseService,
    private navCtrl: NavController,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp = () => {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.dbService.createInitialDatabaseSchema(this.initialDatabaseSuccess);
    });
  }

  checkUSerExist = () => {
    this.userService.getUser(this.getUserResult, null);
  }

  getUserResult = (user: any) => {
    if (user.rows.length > 0) {
      this.goToLogin();
    } else {
      this.goToRegister();
    }
  }

  goToRegister = (): any => {
    this.navCtrl.navigateForward(['/login-register'], { queryParams: { id: 'register' } });
  }

  goToLogin = (): any => {
    this.navCtrl.navigateForward(['/login-register'], { queryParams: { id: 'login' } });
  }

  initialDatabaseSuccess = () => {
    this.checkUSerExist();
  }
}
