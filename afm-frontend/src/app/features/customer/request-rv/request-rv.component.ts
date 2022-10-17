import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RVRequestModel } from 'src/app/core/models/rv-request.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-request-rv',
  templateUrl: './request-rv.component.html',
  styleUrls: ['./request-rv.component.scss'],
})
export class RequestRvComponent implements OnInit {
  bookingDate: Date;
  todayDate = moment().toDate();
  fromTime: Date;
  toTime: Date;
  rvRequest: RVRequestModel;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.rvRequest = new RVRequestModel();
  }

  disableSubmit(): boolean {
    return (
      !this.rvRequest.firstName ||
      !this.rvRequest.lastName ||
      !this.rvRequest.numberOfPeople ||
      !this.bookingDate ||
      !this.fromTime ||
      !this.toTime ||
      !this.rvRequest.address ||
      !this.rvRequest.zipCode ||
      !this.rvRequest.emailId ||
      !this.rvRequest.mobileNumber
    );
  }

  submitClicked() {
    this.rvRequest.bookingDate = moment(this.bookingDate).format('YYYY-MM-DD');
    this.rvRequest.bookingTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');

    this.dataService.requestRV(this.rvRequest).subscribe(() => {});
  }
}
