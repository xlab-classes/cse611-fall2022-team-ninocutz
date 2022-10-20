import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PastEventsModel } from 'src/app/core/models/past-events.model';

@Component({
  selector: 'app-customer-past-event',
  templateUrl: './customer-past-event.component.html',
  styleUrls: ['./customer-past-event.component.scss'],
})
export class CustomerPastEventComponent implements OnInit {
  pastEvent: PastEventsModel;
  eventDate: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.pastEvent = this.config.data.event;
    this.eventDate = this.pastEvent.EventDate = moment(this.eventDate).format(
      'LL'
    );
  }
}
