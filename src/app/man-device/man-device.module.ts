import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManDevicePageRoutingModule } from './man-device-routing.module';

import { ManDevicePage } from './man-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManDevicePageRoutingModule
  ],
  declarations: [ManDevicePage]
})
export class ManDevicePageModule {}
