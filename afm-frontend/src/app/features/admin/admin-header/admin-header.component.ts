import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(private router: Router) {}

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Add Current Event',
        routerLink: ['/admin/current-event'],
      },
      {
        label: 'Future Events',
        routerLink: ['/admin/future-events'],
      },
      {
        label: 'Past Events',
        routerLink: ['/admin/past-events'],
      },
      {
        label: 'Gallery',
        routerLink: ['/admin/gallery'],
      },
      {
        label: 'Bookings',
        routerLink: ['/admin/bookings'],
      },
      {
        label: 'Users',
        routerLink: ['/admin/users'],
      },
    ];
  }

  homeIconClicked() {
    this.router.navigate(['/admin']);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
