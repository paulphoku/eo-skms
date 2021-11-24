import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManKeyPageRoutingModule } from './man-key-routing.module';

import { ManKeyPage } from './man-key.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManKeyPageRoutingModule
  ],
  declarations: [ManKeyPage]
})
export class ManKeyPageModule {}
