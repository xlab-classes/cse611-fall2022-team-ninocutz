import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { BookedRvSlotsModels } from 'src/app/core/models/booked-rv-slots.model';
import { RVRequestModel } from 'src/app/core/models/rv-request.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-request-rv',
  templateUrl: './request-rv.component.html',
  styleUrls: ['./request-rv.component.scss'],
  providers: [MessageService],
})
export class RequestRvComponent implements OnInit {
  bookingDate: Date;
  todayDate = moment().toDate();
  fromTime: Date;
  toTime: Date;
  rvRequest: RVRequestModel;
  bookedSlots: BookedRvSlotsModels[];
  disabledSlots: string = '';
  invalidZipCode = false;
  invalidPhoneNumber = false;
  invalidEmail = false;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.rvRequest = new RVRequestModel();
    this.getBookedSlots();
  }

  getBookedSlots() {
    this.dataService.getBookedSlots().subscribe((data) => {
      this.bookedSlots = data.bookings;
    });
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
      !this.rvRequest.mobileNumber ||
      this.invalidZipCode ||
      this.invalidPhoneNumber ||
      this.invalidEmail
    );
  }

  submitClicked() {
    this.rvRequest.bookingDate = moment(this.bookingDate).format('YYYY-MM-DD');
    this.rvRequest.bookingTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');

    this.dataService.requestRV(this.rvRequest).subscribe(() => {
      this.rvRequest = new RVRequestModel();
      this.showSuccessMessage();
    });
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Sent RV Request',
    });
  }

  dateSelected(event: Date) {
    const formatedDate = moment(event).format('YYYY-MM-DD');
    const timeSlots = this.bookedSlots.filter(
      (x) => x.BookingDate === formatedDate
    )[0];
    if (timeSlots) {
      this.disabledSlots = timeSlots.BookingSlots.join(', ');
    } else {
      this.disabledSlots = '';
    }
  }

  validateZipCode() {
    this.invalidZipCode = ('' + this.rvRequest.zipCode).length != 5;
  }

  validatePhoneNumber() {
    this.invalidPhoneNumber = ('' + this.rvRequest.mobileNumber).length != 10;
  }

  validateEmailId() {
    const regex = new RegExp(
      '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
    );
    this.invalidEmail = !regex.test(this.rvRequest.emailId);
  }
}
