import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserModel } from 'src/app/core/models/user.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  loading = false;
  oldUser: UserModel;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = {
      FirstName: '',
      LastName: '',
      Address: '',
      MobileNumber: '',
      EmailID: '',
      ZipCode: '',
      Id: 0,
    };
    this.getUserProfile();
  }

  getUserProfile() {
    this.loading = true;
    this.dataService.getUserProfile().subscribe((data) => {
      this.user = data.user;
      this.oldUser = JSON.parse(JSON.stringify(data.user));
      this.loading = false;
    });
  }

  updateProfile() {
    this.loading = true;
    this.dataService.updateUserProfile(this.user).subscribe((data) => {
      this.loading = false;
      this.oldUser = JSON.parse(JSON.stringify(this.user));
      this.showSuccess();
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile Updated',
    });
  }

  disableUpdate(): boolean {
    return JSON.stringify(this.oldUser) == JSON.stringify(this.user);
  }
}
