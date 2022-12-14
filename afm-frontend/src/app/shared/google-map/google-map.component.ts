import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('search') public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
    mapTypeControl: false,
    fullscreenControl: false,
  };
  marker: any;
  newPosition: {
    lat: number;
    lng: number;
  };
  zipCode: string;
  address: string;
  addressSearched: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.newPosition = {
      lat: this.config.data.lat,
      lng: this.config.data.lng,
    };
    this.setCenterAndMarker();
  }

  ngAfterViewInit(): void {
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        this.newPosition = {
          lat: place.geometry.location?.lat() ?? this.newPosition.lat,
          lng: place.geometry.location?.lng() ?? this.newPosition.lng,
        };
        this.setCenterAndMarker();
      });
    });
  }

  setCenterAndMarker() {
    this.center = this.newPosition;
    this.addMarker();
    this.getMarkerZipCode();
  }

  addMarker() {
    this.marker = {
      position: this.newPosition,
      title: 'Marker title ',
      options: { animation: google.maps.Animation.DROP, draggable: true },
    };
  }

  geocoder = new google.maps.Geocoder();

  getMarkerZipCode() {
    let latlng = new google.maps.LatLng(
      this.newPosition.lat,
      this.newPosition.lng
    );

    this.geocoder.geocode({ location: latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results && results[0]) {
          this.address = results[0].formatted_address;
          const addressComponents = results[0].address_components;
          for (var i = 0; i < addressComponents.length; i++) {
            if (addressComponents[i].types.includes('postal_code')) {
              this.zipCode = results[0].address_components[i].short_name;
            }
          }
        }
      }
    });
  }

  updateMarkerLocation(marker: any) {
    this.newPosition.lat = marker.latLng.lat();
    this.newPosition.lng = marker.latLng.lng();
    this.getMarkerZipCode();
  }

  updateLocation() {
    this.ref.close({
      lat: this.newPosition.lat,
      lng: this.newPosition.lng,
      zipCode: this.zipCode,
      address: this.address,
    });
  }
}
