import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserRequestModel } from 'src/app/core/models/user-request.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  user: UserRequestModel;
  invalidZipCode = false;
  invalidEmail = false;
  invalidPhoneNumber = false;
  loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.user = new UserRequestModel();
  }

  disableAddButton(): boolean {
    return !(
      this.user &&
      this.user.firstName &&
      this.user.lastName &&
      this.user.emailId &&
      this.user.mobileNumber &&
      !this.invalidZipCode &&
      !this.invalidEmail &&
      !this.invalidPhoneNumber
    );
  }

  addUser() {
    this.loading = true;
    this.dataService.addUser(this.user).subscribe((data) => {
      this.loading = false;
      this.ref.close(true);
    });
  }

  validateZipCode() {
    this.invalidZipCode = ('' + this.user.zipCode).length != 5;
  }

  validateEmailId() {
    const regex = new RegExp(
      '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
    );
    this.invalidEmail = !regex.test(this.user.emailId);
  }

  validatePhoneNumber() {
    this.invalidPhoneNumber = ('' + this.user.mobileNumber).length != 10;
  }
}
