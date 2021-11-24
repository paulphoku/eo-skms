import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'User Management', url: '/man-user', icon: 'people' },
    { title: 'Key Management', url: '/man-key', icon: 'key' },
    { title: 'Company Management', url: '/man-company', icon: 'briefcase' },
    { title: 'Device Management', url: '/man-device', icon: 'hardware-chip' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }

}
