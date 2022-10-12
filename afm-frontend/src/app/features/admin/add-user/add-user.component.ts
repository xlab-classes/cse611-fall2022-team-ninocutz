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
      this.user.mobileNumber
    );
  }

  addUser() {
    this.dataService.addUser(this.user).subscribe((data) => {
      this.ref.close(true);
    });
  }
}
