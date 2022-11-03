import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { AppointmentsRequestModel } from 'src/app/core/models/appointments-request.model';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { DataService } from 'src/app/core/services/data.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-customer-appointment',
  templateUrl: './customer-appointment.component.html',
  styleUrls: ['./customer-appointment.component.scss'],
  providers: [MessageService],
})
export class CustomerAppointmentComponent implements OnInit {
  bookingDate: Date;
  todayDate = moment().toDate();
  fromTime: Date;
  toTime: Date;
  appointment: AppointmentsRequestModel;
  event: FutureEventsModel;
  localStorageKey = 'future-event';
  eventStartTime: Date;
  eventEndTime: Date;
  invalidEndTime = false;
  invalidPhoneNumber = false;
  invalidEmail = false;
  loading = false;

  constructor(
    private messageService: MessageService,
    private dataService: DataService,
    private sharingService: SharingService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.appointment = new AppointmentsRequestModel();
    this.getEventData();
  }

  getEventData() {
    this.event = this.sharingService.getData();
    if (this.event) {
      this.sessionStorageService.setSessionStorage(
        this.localStorageKey,
        this.event
      );
      this.setEventStartEndTime();
    } else {
      this.event = this.sessionStorageService.getSessionStorage(
        this.localStorageKey
      );
      this.setEventStartEndTime();
    }
  }

  setEventStartEndTime() {
    const temp = this.event.EventTimeSlot.split('-');
    this.eventStartTime = moment('2022-10-13' + ' ' + temp[0]).toDate();
    this.eventEndTime = moment('2022-10-13' + ' ' + temp[1]).toDate();
  }

  disableSubmit(): boolean {
    return (
      !this.appointment.firstName ||
      !this.appointment.lastName ||
      !this.fromTime ||
      !this.toTime ||
      this.invalidEndTime ||
      !this.appointment.emailId ||
      !this.appointment.mobileNumber ||
      this.invalidPhoneNumber ||
      this.invalidEmail
    );
  }

  submitClicked() {
    this.loading = true;
    this.appointment.bookingTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');
    this.appointment.eventId = this.event.Id;

    this.dataService.requestAppointment(this.appointment).subscribe(() => {
      this.appointment = new AppointmentsRequestModel();
      this.loading = false;
      this.showSuccessMessage();
    });
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Sent Appointment Request',
    });
  }

  selectDefaultStartTime() {
    this.fromTime = this.fromTime ?? this.eventStartTime;
  }

  selectDefaultEndTime() {
    this.toTime = this.toTime ?? this.fromTime;
  }

  timeSelected() {
    this.invalidEndTime = this.fromTime > this.toTime;
  }

  validatePhoneNumber() {
    this.invalidPhoneNumber = ('' + this.appointment.mobileNumber).length != 10;
  }

  validateEmailId() {
    const regex = new RegExp(
      '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
    );
    this.invalidEmail = !regex.test(this.appointment.emailId);
  }
}
