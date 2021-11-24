import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { AddKeyPage } from '../modal/add-key/add-key.page';
import { FirebaseService } from '../../services/firebase.service';
import { ObjectOptionsComponent } from '../popover/object-options/object-options.component';

@Component({
  selector: 'app-man-key',
  templateUrl: './man-key.page.html',
  styleUrls: ['./man-key.page.scss'],
})
export class ManKeyPage implements OnInit {

  Key: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private firebase: FirebaseService,
    public popoverController: PopoverController,

  ) { }


  ngOnInit() {
    this.get_keys();
  }

  /**
  * add_new_key
  */
  public async add_new_key() {
    const modal = await this.modalCtrl.create({
      component: AddKeyPage,
      cssClass: 'modalClass',
    })

    modal.present();
    await modal.onWillDismiss().then(res => {
      this.get_keys();
      console.log('popver dissmised:');
    })

  }

  /**
   * get_keys
   */
  public async get_keys() {
    this.Key = await this.firebase.getKeys();
  }

  /**
   * options_menu
   */
  public async options_menu(ev: any, event, val) {
    const popover = await this.popoverController.create({
      component: ObjectOptionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        event: event,
        val: val,
      },
    });

    return await popover.present();
  }


}
