import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  showHeader: boolean = false;

  headerIgnoredUrls = ['signin', 'forgot-password', 'reset-password'];

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !this.headerIgnoredUrls.some((v) =>
          event.url.includes(v)
        );
      }
    });
  }

  ngOnInit(): void {}
}
