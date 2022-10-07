import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  forgotPasswordClicked() {
    this.dataService.forgotPassword(this.email).subscribe((data) => {
      console.log('Sent Email for forgot password');
    });
  }
}
