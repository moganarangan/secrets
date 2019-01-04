import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public config: Array<any> = [{'name': 'userName'}, {'name': 'password'}, {'name': 'field1'}];
  public form: FormGroup;

  constructor(private navCtrl: NavController, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup = () => {
    const group = this.fb.group({});
    this.config.forEach(control => group.addControl(control.name, new FormControl('', [Validators.required])));
    return group;
  }

  saveAndClose = () => {
    this.navCtrl.navigateRoot(['/home']);
  }
}
