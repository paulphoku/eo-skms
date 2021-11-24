import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKeyPageRoutingModule } from './add-key-routing.module';

import { AddKeyPage } from './add-key.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddKeyPageRoutingModule
  ],
  declarations: [AddKeyPage]
})
export class AddKeyPageModule { }
