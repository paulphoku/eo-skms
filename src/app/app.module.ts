import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { ObjectOptionsComponent } from './popover/object-options/object-options.component';
import { AppRoutingModule } from './app-routing.module';


import { ToasterService } from '../services/toaster.service';
import { AlertService } from '../services/alert.service';
import { FirebaseService } from '../services/firebase.service';
import { environment } from '../environments/environment';
import { initializeApp } from "firebase/app"

//initialize firebase here 😩
initializeApp(
  environment.firebaseConfig
);

@NgModule({
  declarations: [
    AppComponent,
    ObjectOptionsComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    AlertService,
    ToasterService,
    FirebaseService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
