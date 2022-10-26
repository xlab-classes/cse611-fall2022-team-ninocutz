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
    } else {
      this.event = this.sessionStorageService.getSessionStorage(
        this.localStorageKey
      );
    }
  }

  disableSubmit(): boolean {
    return (
      !this.appointment.firstName ||
      !this.appointment.lastName ||
      !this.fromTime ||
      !this.toTime ||
      !this.appointment.emailId ||
      !this.appointment.mobileNumber
    );
  }

  submitClicked() {
    this.appointment.bookingTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');
    this.appointment.eventId = this.event.Id;

    this.dataService.requestAppointment(this.appointment).subscribe(() => {
      this.appointment = new AppointmentsRequestModel();
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
}
