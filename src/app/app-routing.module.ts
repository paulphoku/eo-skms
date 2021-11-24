import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'add-user',
    loadChildren: () => import('./modal/add-user/add-user.module').then(m => m.AddUserPageModule)
  },
  {
    path: 'add-key',
    loadChildren: () => import('./modal/add-key/add-key.module').then(m => m.AddKeyPageModule)
  },
  {
    path: 'add-device',
    loadChildren: () => import('./modal/add-device/add-device.module').then(m => m.AddDevicePageModule)
  },
  {
    path: 'add-company',
    loadChildren: () => import('./modal/add-company/add-company.module').then(m => m.AddCompanyPageModule)
  },
  {
    path: 'man-user',
    loadChildren: () => import('./man-user/man-user.module').then(m => m.ManUserPageModule)
  },
  {
    path: 'man-key',
    loadChildren: () => import('./man-key/man-key.module').then(m => m.ManKeyPageModule)
  },
  {
    path: 'man-company',
    loadChildren: () => import('./man-company/man-company.module').then(m => m.ManCompanyPageModule)
  },
  {
    path: 'man-device',
    loadChildren: () => import('./man-device/man-device.module').then(m => m.ManDevicePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
