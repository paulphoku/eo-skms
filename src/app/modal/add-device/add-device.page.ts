import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController } from "@ionic/angular";
import { ToasterService } from '../../../services/toaster.service';
import { AlertService } from '../../../services/alert.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  addDeviceForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  Company: any[] = [];

  constructor(
    private toaster: ToasterService,
    private alerter: AlertService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private firebase: FirebaseService

  ) {
    this.addDeviceForm = this.fb.group({
      name: ['', Validators.required],
      ref: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.get_companys();
  }

  /**
   * submit
   */
  public submit() {
    this.isSubmitted = true;
    if (this.addDeviceForm.invalid) return

    let name = this.addDeviceForm.get('name').value;
    let ref = this.addDeviceForm.get('ref').value;
    let company = this.addDeviceForm.get('company').value;
    let state = 0;
    let photo_url = '';

    if (this.firebase.createDevice(ref, name, company, photo_url, state)) {
      console.log('done')
      this.modalCtrl.dismiss();
      this.toaster.successToast('New User added! 👌')
    } else {
      console.log('something went wrong')
      this.toaster.errorToast("Something wen't wrong couldn't add user!")
    }


  }

  /**
   * dismiss
   */
  public dismiss() {
    this.modalCtrl.dismiss()
  }

  private async get_companys() {
    this.Company = await this.firebase.getCompanys();
  }



}
