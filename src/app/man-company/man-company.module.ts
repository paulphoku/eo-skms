import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManCompanyPageRoutingModule } from './man-company-routing.module';

import { ManCompanyPage } from './man-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManCompanyPageRoutingModule
  ],
  declarations: [ManCompanyPage]
})
export class ManCompanyPageModule {}
