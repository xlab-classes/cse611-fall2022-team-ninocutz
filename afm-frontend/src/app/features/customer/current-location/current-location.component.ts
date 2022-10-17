import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss'],
})
export class CurrentLocationComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;

  marker: any;
  options: google.maps.MapOptions = {
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
  };
  center: google.maps.LatLngLiteral;
  constructor() {}

  ngOnInit(): void {
    this.addMarker();
  }

  addMarker() {
    this.center = {
      lat: this.latitude,
      lng: this.longitude,
    };
    this.marker = {
      position: {
        lat: this.latitude,
        lng: this.longitude,
      },
      title: 'Marker title',
      options: { animation: google.maps.Animation.DROP },
    };
  }

  markerClicked() {
    const link =
      'http://maps.google.com/maps?daddr=' +
      this.latitude +
      ',' +
      this.longitude;
    window.open(link);
  }
}
