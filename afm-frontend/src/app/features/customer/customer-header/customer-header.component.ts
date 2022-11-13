import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit {
  constructor(private router: Router) {}

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Future Events',
        routerLink: ['/home', { pageSec: 'futureEventsDisplay' }],
        styleClass: 'afm-header'
      },
      {
        label: 'Past Events',
        routerLink: ['/home', { pageSec: 'pastEventsDisplay' }],
      },
      {
        label: 'Gallery',
        routerLink: ['/home', { pageSec: 'galleryDisplay' }],
      },
      {
        label: 'Request RV',
        routerLink: ['/request-rv'],
      },
      {
        label: 'Sign Up',
        routerLink: ['/sign-up'],
      },
    ];
  }

  homeIconClicked() {
    this.router.navigate(['']);
  }
}
