import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddKeyPage } from './add-key.page';

const routes: Routes = [
  {
    path: '',
    component: AddKeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddKeyPageRoutingModule {}
