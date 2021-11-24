import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { AddCompanyPage } from '../modal/add-company/add-company.page';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-man-company',
  templateUrl: './man-company.page.html',
  styleUrls: ['./man-company.page.scss'],
})
export class ManCompanyPage implements OnInit {

  Company: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private firebase: FirebaseService

  ) { }


  ngOnInit() {
    this.get_companys();
  }

  /**
  * add_new_company
  */
  public async add_new_company() {
    const modal = await this.modalCtrl.create({
      component: AddCompanyPage,
      cssClass: 'modalClass',
    })

    modal.present();
    await modal.onWillDismiss().then(res => {
      this.get_companys();
      console.log('popver dissmised:');
    })

  }

  /**
   * get_companys
   */
  public async get_companys() {
    this.Company = await this.firebase.getCompanys();
  }


}
