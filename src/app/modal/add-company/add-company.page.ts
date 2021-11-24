import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController } from "@ionic/angular";
import { ToasterService } from '../../../services/toaster.service';
import { AlertService } from '../../../services/alert.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.page.html',
  styleUrls: ['./add-company.page.scss'],
})
export class AddCompanyPage implements OnInit {

  addCompanyForm: FormGroup;
  isLoading = false;
  isSubmitted = false;

  constructor(
    private toaster: ToasterService,
    private alerter: AlertService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private firebase: FirebaseService

  ) {
    this.addCompanyForm = this.fb.group({
      name: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_number: ['', Validators.required],
      contact_email: ['', Validators.email],
    });
  }

  ngOnInit() {
  }

  /**
   * submit
   */
  public submit() {
    this.isSubmitted = true;
    if (this.addCompanyForm.invalid) return

    let name = this.addCompanyForm.get('name').value;
    let contact_person = this.addCompanyForm.get('contact_person').value;
    let contact_nr = this.addCompanyForm.get('contact_number').value;
    let contact_email = this.addCompanyForm.get('contact_email').value;
    let state = 0;

    console.log('name:', name);
    if (this.firebase.createCompany(name, contact_person, contact_nr, contact_email, state)) {
      console.log('done')
      this.modalCtrl.dismiss();
      this.toaster.successToast('New Company added! 👌')
    } else {
      console.log('something went wrong')
      this.toaster.errorToast("Something wen't wrong couldn't add company!")
    }

  }

  /**
   * dismiss
   */
  public dismiss() {
    this.modalCtrl.dismiss()
  }


}
