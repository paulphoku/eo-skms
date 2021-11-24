import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { AddUserPage } from '../modal/add-user/add-user.page';
import { ProfilePage } from '../profile/profile.page';
import { FirebaseService } from '../../services/firebase.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-man-user',
  templateUrl: './man-user.page.html',
  styleUrls: ['./man-user.page.scss'],
})

export class ManUserPage implements OnInit {
  @Input('key_ref') key_ref;
  Users: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private firebase: FirebaseService,
    private toaster: ToasterService,

  ) { }


  ngOnInit() {
    this.get_users();
  }

  /**
  * add_new_user
  */
  public async add_new_user() {
    const modal = await this.modalCtrl.create({
      component: AddUserPage,
      cssClass: 'modalClass',
    })

    modal.present();
    await modal.onWillDismiss().then(res => {
      this.get_users();
      console.log('popver dissmised:');
    })
  }

  /**
   * get_users
   */
  public async get_users() {
    this.Users = await this.firebase.getUsers();
  }

  /**
   * open_profile
   */
  public async select_profile(User) {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: 'modalClass',
      componentProps: {
        name: User.name,
        surname: User.surname,
        company: User.company,
        email: User.email,
        user_id: User.user_id,
        photo_url: User.photo_url,
        datetime: User.datetime
      }
    })

    if (this.key_ref) {
      let user_id = User.user_id;
      let key_ref = this.key_ref;
      let state = 0;

      console.log('Key:', user_id)
      if (this.firebase.createKeyAlloc(user_id, key_ref, state) != undefined) {
        console.log('done')
        this.modalCtrl.dismiss();
        this.toaster.successToast('New key associated with user! 👌')
      } else {
        console.log('something went wrong')
        this.toaster.errorToast("Key already allocated to user!")
      }
      this.modalCtrl.dismiss();
    } else {
      modal.present();
      await modal.onWillDismiss().then(res => {
        this.get_users();
        console.log('popver dissmised:');
      })
    }


  }



}
