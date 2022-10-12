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
import { EventTypesResponseModel } from '../models/event-types-response.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiBaseUrl = environment.apibaseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private getBearerToken(): string {
    const token = this.localStorageService.getLocalStorage('token');
    return `Bearer ${token}`;
  }

  private getData<T>(apiUrl: string, useAuth = false): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;

    let headers = new HttpHeaders();
    if (useAuth) {
      headers = headers.append('Authorization', this.getBearerToken());
    }
    const httpOptions = {
      headers: headers,
    };
    return this.httpClient.get<T>(url, httpOptions);
  }

  private postData<T>(
    apiUrl: string,
    data: any,
    useAuth = false
  ): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;

    let headers = new HttpHeaders();
    if (useAuth) {
      headers = headers.append('Authorization', this.getBearerToken());
    }
    const httpOptions = {
      headers: headers,
    };

    return this.httpClient.post<T>(url, data, httpOptions);
  }

  private putData<T>(
    apiUrl: string,
    data: any,
    useAuth = false
  ): Observable<T> {
    const url = this.apiBaseUrl + apiUrl;
    let headers = new HttpHeaders();
    if (useAuth) {
      headers = headers.append('Authorization', this.getBearerToken());
    }
    const httpOptions = {
      headers: headers,
    };
    return this.httpClient.put<T>(url, data, httpOptions);
  }

  getAllFutureEvents(): Observable<FutureEventResponseModel> {
    return this.getData<FutureEventResponseModel>('event/future');
  }

  getAllPastEvents(): Observable<PastEventsResponseModel> {
    return this.getData<PastEventsResponseModel>('event/past');
  }

  getAllGalleryImages(): Observable<GalleryImagesResponseModel> {
    return this.getData<GalleryImagesResponseModel>('images/gallery', true);
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

    return this.postData('event-current', formData, true);
  }

  getAllBookings(): Observable<BookingsResponseModel> {
    return this.getData<BookingsResponseModel>('bookings', true);
  }

  addNewGalleryImage(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    return this.postData('images/gallery', formData, true);
  }

  deleteGalleryImage(imageId: number): Observable<any> {
    const url = this.apiBaseUrl + 'images/gallery/' + imageId;

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.getBearerToken());

    const httpOptions = {
      headers: headers,
    };

    return this.httpClient.delete(url, httpOptions);
  }

  getAllNotifications(): Observable<NotificationsResponseModel> {
    return this.getData<NotificationsResponseModel>('notifications', true);
  }

  updateNotification(notificationUpdate: NotificationsModel): Observable<any> {
    const data = {
      id: notificationUpdate.Id,
      notificationTemplate: notificationUpdate.NotificationTemplate,
      notificationType: notificationUpdate.NotificationType,
    };
    return this.putData('notifications', data, true);
  }

  editFutureEvent(
    eventId: string,
    data: EventRequestModel,
    file?: File
  ): Observable<any> {
    const formData = new FormData();

    formData.append('eventId', eventId);
    formData.append('eventName', data.eventName);
    formData.append('eventType', data.eventType);
    formData.append('longitude', data.longitude);
    formData.append('latitude', data.latitude);
    formData.append('address', data.address);
    formData.append('eventDate', data.eventDate);
    formData.append('zipCode', data.zipCode);
    formData.append('message', data.message);
    formData.append('eventTimeSlot', data.eventTimeSlot);

    if (file) {
      formData.append('file', file, file.name);
    }

    return this.putData('event', formData, true);
  }

  forgotPassword(email: string): Observable<any> {
    const url = this.apiBaseUrl + 'forgot-password';

    const data = {
      username: email,
    };

    return this.httpClient.post(url, data, {
      responseType: 'text',
    });
  }

  resetPassword(
    token: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const data = {
      password: password,
      confirmPassword: confirmPassword,
    };
    const url = this.apiBaseUrl + 'reset-password';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);
    return this.httpClient.put(url, data, {
      responseType: 'text',
      headers: headers,
    });
  }

  getEventTypes(): Observable<EventTypesResponseModel> {
    return this.getData<EventTypesResponseModel>('event-types');
  }
}
