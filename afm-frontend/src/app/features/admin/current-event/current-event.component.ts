import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.scss'],
})
export class CurrentEventComponent implements OnInit {
  fromTime: Date;
  toTime: Date;
  lat: number;
  lng: number;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {}

  shareLocationClicked() {
    this.locationService.getPosition().then((pos) => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
  }
}
