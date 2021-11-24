import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ManUserPage } from '../../man-user/man-user.page';

@Component({
  selector: 'app-object-options',
  templateUrl: './object-options.component.html',
  styleUrls: ['./object-options.component.scss'],
})
export class ObjectOptionsComponent implements OnInit {

  public list = [];

  options_users: any[] = ['Remove user', 'Allocated keys'];
  options_device: any[] = ['Remove device'];
  options_key: any[] = ['Remove Key', 'Allocate key'];
  options_company: any[] = ['remove company'];

  @Input('ev') event: String;
  @Input('val') val: String;

  constructor(
    public popoverController: PopoverController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.init();
  }

  /**
  * init
  */
  public init() {
    switch (this.event) {
      case 'options_users':
        this.list = this.options_users;
        break;

      case 'options_device':
        this.list = this.options_device;
        break;

      case 'options_key':
        this.list = this.options_key;
        break;

      case 'options_company':
        this.list = this.options_company;
        break;

      default:
        break;
    }
  }

  /**
   * exploit
   */
  public async exploit(action) {
    switch (action) {
      case 'Remove user':
        this.popoverController.dismiss();
        break;

      case 'Allocate key':
        this.list_users();
        await this.popoverController.dismiss();

        break;

      default:
        break;
    }
  }

  public async list_users() {
    const modal = await this.modalCtrl.create({
      component: ManUserPage,
      cssClass: 'modalClass',
      componentProps: {
        key_ref: this.val
      }
    })

    modal.present();
  }

}
