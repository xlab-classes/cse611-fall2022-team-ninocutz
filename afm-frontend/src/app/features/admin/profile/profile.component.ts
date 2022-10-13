import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: UserModel;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.user = {
      Id: 1,
      FirstName: 'test',
      LastName: 'test',
      EmailId: 'test@test.com',
      MobileNumber: '123434',
      Address: 'test 3q4',
      ZipCode: '14214',
    };
    // this.dataService.getUserProfile().subscribe((data) => {
    //   this.user = data;
    // });
  }

  updateProfile() {
    // TODO: update Profile on submit
  }
}
