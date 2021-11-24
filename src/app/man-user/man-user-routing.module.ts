import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManUserPage } from './man-user.page';

const routes: Routes = [
  {
    path: '',
    component: ManUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManUserPageRoutingModule {}
