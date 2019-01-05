import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ConfirmPinValidator } from '../helpers/confirm-pin.validator';
import * as moment from 'moment';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  public isLogin: boolean;
  public user: object;
  public userForm: FormGroup;
  public loginForm: FormGroup;
  public loginError: boolean;
  public enteredPin: Number;

  constructor(private route: ActivatedRoute,
    private userService: UserService, private formBuilder: FormBuilder, private navCtrl: NavController) {
    }

  ngOnInit() {
   this.route
    .queryParams
    .subscribe(params => {
      this.isLogin = (params['id'] === 'login');

      if (this.isLogin) {
        this.createLoginForm();
      } else {
        this.createUserRegisterForm();
      }
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

  createLoginForm = () => {
    this.loginForm = this.formBuilder.group({
      loginPin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  getRandomId = () => {
    return Math.random().toString(36).replace('0.', '');
  }

   registerAndGo = () => {
     if (this.userForm.valid) {
      const now = moment.utc().format();

      this.user = {
         'id': this.getRandomId(),
         'name': this.userForm.value['name'],
         'pin': this.userForm.value['pin'],
         'dateCreated': now,
         'dateLastModified': now
       };

      this.userService.saveUser(this.user, this.saveUserResult, null);
   }
  }

  saveUserResult = (response) => {
    this.navCtrl.navigateRoot(['/home']);
  }

   loginAndGo = () => {
     if (this.loginForm.valid) {
       this.loginError = false;
       this.enteredPin = this.loginForm.value['loginPin'];
       this.userService.getUser(this.getUserResult, null);
   }
  }

  getUserResult = (user: any) => {
    if (user.rows.item(0).PIN === this.enteredPin) {
      this.navCtrl.navigateRoot(['/home']);
    } else {
      this.loginError = true;
    }
  }

}
