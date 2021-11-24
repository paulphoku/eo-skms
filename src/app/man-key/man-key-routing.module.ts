import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManKeyPage } from './man-key.page';

const routes: Routes = [
  {
    path: '',
    component: ManKeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManKeyPageRoutingModule {}
