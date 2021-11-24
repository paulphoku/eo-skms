import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @Input('name') name;
  @Input('surname') surname;
  @Input('company') company;
  @Input('user_id') user_id;
  @Input('photo_url') photo_url;
  @Input('datetime') datetime;
  @Input('email') email;

  Key: any[] = [];

  constructor(
    private firebase: FirebaseService
  ) {
  }

  ngOnInit() {
    this.get_user_alloc_key();
  }

  /**
   * get_user_alloc_key
   */
  public async get_user_alloc_key() {

    this.Key = await this.firebase.get_user_keys(this.user_id);
    console.log(this.Key)
  }

}
