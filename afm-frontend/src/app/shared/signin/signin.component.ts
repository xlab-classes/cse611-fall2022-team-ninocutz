import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginClicked() {
    this.dataService.loginUser(this.email, this.password).subscribe((data) => {
      this.localStorageService.setLocalStorage('token', data.access_token);
      this.router.navigate(['/admin']);
    });
  }
}
