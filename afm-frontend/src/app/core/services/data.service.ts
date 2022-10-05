import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventRequestModel } from '../models/event-request.model';
import { AuthResponseModel } from '../models/auth-response.model';
import { LocalStorageService } from './local-storage.service';
import { FutureEventResponseModel } from '../models/future-events-response.model';
import { CurrentEventRequestModel } from '../models/current-event-request.model';
import { PastEventsResponseModel } from '../models/past-events-response.model';
import { GalleryImagesResponseModel } from '../models/gallery-images-response.model';
import { environment } from 'src/environments/environment';
import { BookingsResponseModel } from '../models/bookings-response.model';
import { NotificationsResponseModel } from '../models/notifications-response.model';
import { NotificationsModel } from '../models/notifications.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiBaseUrl = environment.apibaseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private getData<T>(apiUrl: string): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;
    return this.httpClient.get<T>(url);
  }

  private postData<T>(
    apiUrl: string,
    data: any,
    useAuth = false
  ): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;

    if (useAuth) {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.httpClient.post<T>(url, data, httpOptions);
    }
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return this.httpClient.post<T>(url, data, httpOptions);
  }

  private putData<T>(apiUrl: string, data: any): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;
    return this.httpClient.put<T>(url, data);
  }

  getAllFutureEvents(): Observable<FutureEventResponseModel> {
    return this.getData<FutureEventResponseModel>('event/future');
  }

  getAllPastEvents(): Observable<PastEventsResponseModel> {
    return this.getData<PastEventsResponseModel>('event/past');
    // return this.getData<FutureEventResponseModel>('/event/future');
  }

  getAllGalleryImages(): Observable<GalleryImagesResponseModel> {
    return this.getData<GalleryImagesResponseModel>('images/gallery');
  }

  createEvent(data: EventRequestModel, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('eventName', data.eventName);
    formData.append('eventType', data.eventType);
    formData.append('longitude', data.longitude);
    formData.append('latitude', data.latitude);
    formData.append('address', data.address);
    formData.append('eventDate', data.eventDate);
    formData.append('zipCode', data.zipCode);
    formData.append('message', data.message);
    formData.append('eventTimeSlot', data.eventTimeSlot);
    formData.append('file', file, file.name);

    const token = this.localStorageService.getLocalStorage('token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    return this.postData('event', formData, true);
  }

  loginUser(emailId: string, password: string): Observable<AuthResponseModel> {
    const data = {
      username: emailId,
      password: password,
    };

    return this.postData('auth', data);
  }

  addCurrentEvent(data: CurrentEventRequestModel): Observable<any> {
    const formData = new FormData();

    formData.append('eventName', data.eventName);
    formData.append('eventType', data.eventType);
    formData.append('longitude', data.longitude);
    formData.append('latitude', data.latitude);
    formData.append('address', data.address);
    formData.append('eventDate', data.eventDate);
    formData.append('zipCode', data.zipCode);
    formData.append('message', data.message);
    formData.append('eventTimeSlot', data.eventTimeSlot);

    return this.postData('event/current', formData);
  }

  getAllBookings(): Observable<BookingsResponseModel> {
    return this.getData<BookingsResponseModel>('bookings');
  }

  addNewGalleryImage(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    return this.postData('images/gallery', formData);
  }

  deleteGalleryImage(imageId: number): Observable<any> {
    const url = this.apiBaseUrl + 'images/gallery/' + imageId;

    return this.httpClient.delete(url);
  }

  getAllNotifications(): Observable<NotificationsResponseModel> {
    return this.getData<NotificationsResponseModel>('notifications');
  }

  updateNotification(notificationUpdate: NotificationsModel): Observable<any> {
    const data = {
      id: notificationUpdate.Id,
      notificationTemplate: notificationUpdate.NotificationTemplate,
      notificationType: notificationUpdate.NotificationType,
    };
    return this.putData('notifications', data);
  }
}
