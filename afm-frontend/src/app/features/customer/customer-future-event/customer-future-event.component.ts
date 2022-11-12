import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-customer-future-event',
  templateUrl: './customer-future-event.component.html',
  styleUrls: ['./customer-future-event.component.scss'],
})
export class CustomerFutureEventComponent implements OnInit {
  futureEvent: FutureEventsModel;
  eventDate: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private sharingService: SharingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.futureEvent = this.config.data.event;
    this.eventDate = moment(this.futureEvent.EventDate)
      .add(1, 'days')
      .format('LL');
  }

  openAppointmentBooking() {
    this.sharingService.setData(this.futureEvent);
    this.ref.close();
    this.router.navigate(['/appointment-request']);
  }
}
