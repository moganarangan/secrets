import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateNameComponent } from '../update-name/update-name.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openUpdateName() {
    const modal = await this.modalController.create({
      component: UpdateNameComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  openUpdatePin = () => {
  }

}
