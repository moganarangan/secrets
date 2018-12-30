import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  private id: string;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
   this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
    });
  }

  goToHome = () => {
    this.router.navigate(['./home']);
  }

}
