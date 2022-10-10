import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  // Read password from URL
  email: string;
  password = '';
  confirmPassword = '';
  token: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      const jwt = this.getDecodedAccessToken();
      this.email = jwt.sub;
    });
  }

  resetPassword() {
    this.dataService
      .resetPassword(this.token, this.password, this.confirmPassword)
      .subscribe((data) => {
        this.router.navigate(['/login']);
      });
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(this.token);
    } catch (Error) {
      return null;
    }
  }

  disableReset(): boolean {
    return !(
      this.email?.length > 0 &&
      this.password?.length > 0 &&
      this.confirmPassword?.length > 0 &&
      this.password == this.confirmPassword
    );
  }
}
