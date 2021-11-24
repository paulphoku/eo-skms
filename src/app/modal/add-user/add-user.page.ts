import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController } from "@ionic/angular";
import { ToasterService } from '../../../services/toaster.service';
import { AlertService } from '../../../services/alert.service';
import { FirebaseService } from '../../../services/firebase.service';
import { DomSanitizer } from '@angular/platform-browser';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})

export class AddUserPage implements OnInit {

  addUserForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  Company: any[] = [];
  photo_url: any = '';
  file_uri: any;
  user_id = uuidv4();

  constructor(
    private toaster: ToasterService,
    private alerter: AlertService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private domSanitizer: DomSanitizer
  ) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.get_companys();
    let Users = await this.firebase.getUsers();
  }

  /**
   * submit
   */
  public async submit() {
    this.isSubmitted = true;
    if (this.addUserForm.invalid) return

    let name = this.addUserForm.get('name').value;
    let email = this.addUserForm.get('email').value;
    let contact = this.addUserForm.get('contact').value;
    let surname = this.addUserForm.get('surname').value;
    let company = this.addUserForm.get('company').value;
    let state = 0;
    let photo_url = this.photo_url;
    let user_id = this.user_id;

    if(await this.photo_url != '') this.firebase.upload_file('avater', this.photo_url, this.user_id);

    if (this.firebase.createUser(user_id, name, surname, email, contact, company, photo_url, state)) {
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
    this.modalCtrl.dismiss();
  }

  private async get_companys() {
    this.Company = await this.firebase.getCompanys();
  }

  /**
   * take_picture
   */
  public take_picture(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.photo_url = reader.result;
    };
  }

}
