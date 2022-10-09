import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { CurrentEventRequestModel } from 'src/app/core/models/current-event-request.model';
import { DataService } from 'src/app/core/services/data.service';
import { LocationService } from 'src/app/core/services/location.service';
import { GoogleMapComponent } from 'src/app/shared/google-map/google-map.component';

@Component({
  selector: 'app-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.scss'],
  providers: [DialogService],
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
  eventName: string;

  constructor(
    private locationService: LocationService,
    private dataService: DataService,
    public dialogService: DialogService
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
      this.showGoogleMap(pos.lat, pos.lng);
    });
  }

  showGoogleMap(lat: number, lng: number) {
    const ref = this.dialogService.open(GoogleMapComponent, {
      header: 'Choose Location',
      width: '70%',
      data: {
        lat: lat,
        lng: lng,
      },
    });

    ref.onClose.subscribe((pos: any) => {
      if (pos) {
        this.addCurrentEvent(pos);
      }
    });
  }

  addCurrentEvent(pos: any) {
    const data: CurrentEventRequestModel = new CurrentEventRequestModel();
    data.eventName = this.eventName;
    data.eventType = this.selectedEvent.code;
    data.latitude = '' + pos.lat;
    data.longitude = '' + pos.lng;
    data.address = this.address;
    data.eventDate = moment(Date.now()).format('YYYY-MM-DD');
    data.zipCode = '' + this.zipCode;
    data.message = this.message;
    data.eventTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');
    this.dataService.addCurrentEvent(data).subscribe((data) => {
      this.loading = false;
    });
  }
}
