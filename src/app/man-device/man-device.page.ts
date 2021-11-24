import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { AddDevicePage } from '../modal/add-device/add-device.page';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-man-device',
  templateUrl: './man-device.page.html',
  styleUrls: ['./man-device.page.scss'],
})
export class ManDevicePage implements OnInit {


  Device: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private firebase: FirebaseService
  ) { }


  ngOnInit() {
    this.get_devices();
  }

  /**
  * add_new_device
  */
  public async add_new_device() {
    const modal = await this.modalCtrl.create({
      component: AddDevicePage,
      cssClass: 'modalClass',
    })

    modal.present();
    await modal.onWillDismiss().then(res => {
      this.get_devices();
      console.log('popver dissmised:');
    })

  }

  /**
   * get_devices
   */
  public async get_devices() {
    this.Device = await this.firebase.getDevices();
  }



}
