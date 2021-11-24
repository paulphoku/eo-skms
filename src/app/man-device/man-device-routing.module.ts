import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManDevicePage } from './man-device.page';

const routes: Routes = [
  {
    path: '',
    component: ManDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManDevicePageRoutingModule {}
