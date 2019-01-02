import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {

  constructor(private userService: UserService, private navCtrl: NavController, private dbService: DatabaseService) { }

  ngOnInit() {
    this.checkUSerExist();
  }

  checkUSerExist = () => {
    if (this.userService.IsUserExist()) {
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

}
