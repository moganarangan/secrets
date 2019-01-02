import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToAddPage = () => {
    this.navCtrl.navigateForward(['/add']);
  }

  goToSearchPage = () => {
    this.navCtrl.navigateForward(['/search']);
  }

  goToSettingsPage = () => {
    this.navCtrl.navigateForward(['/settings']);
  }
}
