import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
  };
  marker: any;
  newPosition: {
    lat: number;
    lng: number;
  };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.newPosition = {
      lat: this.config.data.lat,
      lng: this.config.data.lng,
    };
    this.center = this.newPosition;
    this.addMarker();
  }

  addMarker() {
    this.marker = {
      position: this.newPosition,
      title: 'Marker title ',
      options: { animation: google.maps.Animation.DROP, draggable: true },
    };
  }

  updateMarkerLocation(marker: any) {
    this.newPosition.lat = marker.latLng.lat();
    this.newPosition.lng = marker.latLng.lng();
  }

  updateLocation() {
    this.ref.close(this.newPosition);
  }
}
