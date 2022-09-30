import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FutureEventsModel } from '../models/future-events.model';
import { PastEventsModel } from '../models/past-events.model';
import { GalleryImagesModel } from '../models/gallery-images.model';
import { FutureEventRequestModel } from '../models/future-event-request.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiBaseUrl = 'http://localhost:5555/';

  constructor(private httpClient: HttpClient) {}

  private getData<T>(apiUrl: string): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;
    return this.httpClient.get<T>(url);
  }

  private postData<T>(apiUrl: string, data: any): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;

    return this.httpClient.post<T>(url, data);
  }

  private putData<T>(apiUrl: string, data: any): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;
    return this.httpClient.put<T>(url, data);
  }

  loadAssetConfigurations(configPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(configPath)
        .toPromise()
        .then((response: any) => {
          this.apiBaseUrl = response.apiBaseUrl;
          // this.apiBaseUrl = 'http://localhost:5555/';
          return resolve(this.apiBaseUrl);
        })
        .then(() => resolve(''))
        .catch(() => reject());
    });
  }

  // getAllFutureEvents(): Observable<FutureEventsModel[]> {
  //   return this.getData<FutureEventsModel[]>('futureEvents');
  // }

  getAllFutureEvents(): Observable<FutureEventsModel[]> {
    return this.httpClient.get<FutureEventsModel[]>(
      './assets/future-events.json'
    );
  }

  getAllPastEvents(): Observable<PastEventsModel[]> {
    return this.httpClient.get<PastEventsModel[]>(
      './assets/future-events.json'
    );
  }

  getAllGalleryImages(): Observable<GalleryImagesModel[]> {
    return this.httpClient.get<GalleryImagesModel[]>(
      './assets/future-events.json'
    );
  }

  addFutureEvent(data: FutureEventRequestModel, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('event_type', data.event_type);
    formData.append('longitude', data.longitude);
    formData.append('latitude', data.latitude);
    formData.append('email_id', data.email_id);
    formData.append('address', data.address);
    formData.append('event_date', data.event_date);
    formData.append('zip_code', data.zip_code);
    formData.append('message', data.message);
    formData.append('file', file, file.name);

    return this.postData('event/future', formData);
  }
}
