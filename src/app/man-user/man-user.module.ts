import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManUserPageRoutingModule } from './man-user-routing.module';

import { ManUserPage } from './man-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManUserPageRoutingModule
  ],
  declarations: [ManUserPage]
})
export class ManUserPageModule {}
