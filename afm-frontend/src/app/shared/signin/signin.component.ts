import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/core/services/data.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [MessageService],
})
export class SigninComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  loginClicked() {
    this.dataService.loginUser(this.email, this.password).subscribe({
      next: (data) => {
        this.localStorageService.setLocalStorage('token', data.access_token);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.showError('Invalid username or password');
      },
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  passwordEntered() {
    this.loginClicked();
  }
}
