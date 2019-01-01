import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {

  constructor(public router: Router,  private userService: UserService) { }

  ngOnInit() {
    this.checkUSerExist();
  }

  checkUSerExist = () => {
    this.userService.getUser().then((user) => {
      if (user === null) {
        setTimeout(() =>  { this.goToRegister(); }, 500);
      } else {
        setTimeout(() =>  { this.goToLogin(); }, 500);
      }
    });
  }

  goToRegister = () => {
    this.router.navigate(['/login-register'], { queryParams: { id: 'register' } });
  }

  goToLogin = () => {
    this.router.navigate(['/login-register'], { queryParams: { id: 'login' } });
  }

}
