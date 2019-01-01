import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPinValidator } from '../helpers/confirm-pin.validator';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  private isLogin: boolean;
  private user: object;
  private userForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
      if (!this.isLogin) {
        this.createUserRegisterForm();
      }
    }

  ngOnInit() {
   this.route
    .queryParams
    .subscribe(params => {
      this.isLogin = (params['id'] === 'login');
    });
  }

  createUserRegisterForm = () => {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4),  Validators.maxLength(15)]],
      pin: ['',  [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      confirmPin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    }, {
      validator: ConfirmPinValidator.MatchPin.bind(this)
   });
  }

  getRandomId = () => {
    return Math.random().toString(36).replace('0.', '') ;
  }

  registerAndGo = () => {
    if (this.userForm.valid) {
      this.user = {
        'id': this.getRandomId(),
        'name': this.userForm.value['name'],
        'pin': this.userForm.value['pin'],
      };

     this.userService.saveUser(this.user).then((successData) => {
       console.log(successData);
       this.router.navigate(['./home']);
    });
    }
  }

  loginAndGo = () => {

  }

}
