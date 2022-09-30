import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CurrentEventRequestModel } from 'src/app/core/models/current-event-request.model';
import { DataService } from 'src/app/core/services/data.service';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.scss'],
})
export class CurrentEventComponent implements OnInit {
  fromTime: Date;
  toTime: Date;
  loading = false;
  address: string;
  zipCode: number;
  message: string;
  selectedEvent: any;
  eventTypes: any[] = [];

  constructor(
    private locationService: LocationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.eventTypes = [
      { name: 'Wedding', code: 'Wedding' },
      { name: 'Club', code: 'Club' },
    ];
  }

  shareLocationClicked() {
    this.loading = true;
    this.locationService.getPosition().then((pos) => {
      const data: CurrentEventRequestModel = new CurrentEventRequestModel();

      data.address = this.address;
      data.event_date = moment(Date.now()).format('YYYY-MM-DD');
      data.latitude = '' + pos.lat;
      data.longitude = '' + pos.lng;
      data.message = this.message;
      data.zip_code = '' + this.zipCode;
      data.event_type = this.selectedEvent.code;
      data.email_id = 'Test@Test.com';
      this.loading = false;

      this.dataService.addCurrentEvent(data).subscribe((data) => {
        debugger;
      });
    });
  }
}
