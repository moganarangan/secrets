import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  saveAndClose = () => {
    this.navCtrl.navigateRoot(['/home']);
  }
}
