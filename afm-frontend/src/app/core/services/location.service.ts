import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  getPosition(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        },
        this.options
      );
    });
  }
}
