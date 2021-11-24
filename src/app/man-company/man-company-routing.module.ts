import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManCompanyPage } from './man-company.page';

const routes: Routes = [
  {
    path: '',
    component: ManCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManCompanyPageRoutingModule {}
