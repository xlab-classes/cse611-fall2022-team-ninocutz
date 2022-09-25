import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  // Read password from URL
  email = 'test@test.com';
  password = '';
  confirmPassword = '';

  constructor() {}

  ngOnInit(): void {}

  resetPassword() {
    //TODO: Add reset password Logic
  }
}
