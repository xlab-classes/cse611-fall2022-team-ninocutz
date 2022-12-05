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
        label: 'AFM',
        styleClass: 'afm-header',
        command: () => this.redirectToAFM(),
      },
      {
        label: 'Future Events',
        routerLink: ['/home', { pageSec: 'futureEventsDisplay' }],
        styleClass: 'afm-header',
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
        id: 'requestRv',
        routerLink: ['/request-rv'],
      },
      {
        label: 'Sign Up',
        id: 'signup',
        routerLink: ['/sign-up'],
      },
    ];
  }

  redirectToAFM() {
    window.location.href = 'https://www.architectformen.com/pages/homepage';
  }

  homeIconClicked() {
    this.router.navigate(['']);
  }
}
