import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController } from "@ionic/angular";
import { ToasterService } from '../../../services/toaster.service';
import { AlertService } from '../../../services/alert.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.page.html',
  styleUrls: ['./add-key.page.scss'],
})
export class AddKeyPage implements OnInit {

  addKeyForm: FormGroup;
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
    this.addKeyForm = this.fb.group({
      name: ['', Validators.required],
      ref: ['', Validators.required],
      company: ['', Validators.nullValidator],
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
    if (this.addKeyForm.invalid) return

    let name = this.addKeyForm.get('name').value;
    let ref = this.addKeyForm.get('ref').value;
    let company = this.addKeyForm.get('company').value;
    let photo_url = '';
    let state = 0;

    if (this.firebase.createKey(name, ref, company, photo_url, state)) {
      console.log('done')
      this.modalCtrl.dismiss();
      this.toaster.successToast('New key added! 👌')
    } else {
      console.log('something went wrong')
      this.toaster.errorToast("Something went wrong couldn't add key!")
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
