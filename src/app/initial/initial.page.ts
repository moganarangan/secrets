import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToRegister = () => {
    this.router.navigate(['/login-register'], { queryParams: { id: 'register' } });
  }

  goToLogin = () => {
    this.router.navigate(['/login-register'], { queryParams: { id: 'login' } });
  }

}
