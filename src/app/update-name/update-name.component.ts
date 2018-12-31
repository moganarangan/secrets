import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.scss']
})
export class UpdateNameComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancel = () => {
    this.modalCtrl.dismiss();
  }
}
