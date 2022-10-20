import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';

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
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.futureEvent = this.config.data.event;
    this.eventDate = this.futureEvent.EventDate = moment(this.eventDate).format(
      'LL'
    );
  }
}
