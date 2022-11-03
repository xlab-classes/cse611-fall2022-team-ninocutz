import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { CurrentEventRequestModel } from 'src/app/core/models/current-event-request.model';
import { EventTypesModel } from 'src/app/core/models/event-types.model';
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
  selectedEvent: EventTypesModel;
  eventTypes: EventTypesModel[] = [];
  invalidZipCode = false;
  currentEvent: CurrentEventRequestModel;

  constructor(
    private locationService: LocationService,
    private dataService: DataService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.currentEvent = new CurrentEventRequestModel();
    this.loadEventTypes();
  }

  loadEventTypes() {
    this.dataService.getEventTypes().subscribe((data) => {
      this.eventTypes = data.eventTypes;
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
        this.setLocationFromMaps(pos);
      } else {
        this.loading = false;
      }
    });
  }

  setLocationFromMaps(pos: {
    lat: string;
    lng: string;
    zipCode: string;
    address: string;
  }) {
    this.currentEvent.latitude = '' + pos.lat;
    this.currentEvent.longitude = '' + pos.lng;
    this.currentEvent.zipCode = pos.zipCode;
    this.currentEvent.address = pos.address;

    this.loading = false;
  }

  disableSubmit(): boolean {
    return (
      !this.currentEvent.eventName ||
      !this.selectedEvent ||
      !this.currentEvent.address ||
      !this.currentEvent.message ||
      !this.currentEvent.zipCode ||
      !this.fromTime ||
      !this.toTime
    );
  }

  addCurrentEvent() {
    this.loading = true;
    this.currentEvent.eventType = this.selectedEvent.Name;
    this.currentEvent.eventDate = moment(Date.now()).format('YYYY-MM-DD');
    this.currentEvent.eventTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');

    this.dataService.addCurrentEvent(this.currentEvent).subscribe(() => {
      this.currentEvent = new CurrentEventRequestModel();
      this.loading = false;
    });
  }

  getLocation() {
    this.loading = true;
    if (this.currentEvent.latitude && this.currentEvent.longitude) {
      this.showGoogleMap(
        +this.currentEvent.latitude,
        +this.currentEvent.longitude
      );
    } else {
      this.locationService.getPosition().then((pos) => {
        this.showGoogleMap(pos.lat, pos.lng);
      });
    }
  }

  validateZipCode() {
    this.invalidZipCode = ('' + this.currentEvent.zipCode).length != 5;
  }
}
