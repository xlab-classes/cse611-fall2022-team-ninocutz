import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  buttonClicked() {
    // Action of what needs to be done after button click can be added here
  }
}
