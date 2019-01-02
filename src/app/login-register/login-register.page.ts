import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ConfirmPinValidator } from '../helpers/confirm-pin.validator';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  public isLogin: boolean;
  private user: object;
  private userForm: FormGroup;
  private loginForm: FormGroup;
  private loginError: boolean;

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
    return Math.random().toString(36).replace('0.', '') ;
  }

  // registerAndGo = () => {
  //   if (this.userForm.valid) {
  //     this.user = {
  //       'id': this.getRandomId(),
  //       'name': this.userForm.value['name'],
  //       'pin': this.userForm.value['pin'],
  //     };

  //    this.userService.saveUser(this.user).then((successData) => {
  //     this.navCtrl.navigateRoot(['/home']);
  //   });
  //   }
  // }

  // loginAndGo = () => {
  //   if (this.loginForm.valid) {
  //     this.loginError = false;

  //     this.userService.getUser().then((user) => {
  //       const storedPin = user['pin'];
  //       if (storedPin === this.loginForm.value['loginPin']) {
  //         this.navCtrl.navigateRoot(['/home']);
  //       } else {
  //         this.loginError = true;
  //       }
  //     });
  //   }
  // }

}
