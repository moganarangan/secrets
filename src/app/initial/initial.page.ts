import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {

  constructor(private userService: UserService, private navCtrl: NavController) { }

  ngOnInit() {
    this.checkUSerExist();
  }

  checkUSerExist = () => {
    // this.userService.getUser().then((user) => {
    //   if (user === null) {
    //     setTimeout(() =>  { this.goToRegister(); }, 500);
    //   } else {
    //     setTimeout(() =>  { this.goToLogin(); }, 500);
    //   }
    // });
  }

  goToRegister = () => {
    this.navCtrl.navigateForward(['/login-register'], { queryParams: { id: 'register' } });
  }

  goToLogin = () => {
    this.navCtrl.navigateForward(['/login-register'], { queryParams: { id: 'login' } });
  }

}
