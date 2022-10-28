import { Component, OnInit, ViewChild } from '@angular/core';
import { EventRequestModel } from 'src/app/core/models/event-request.model';
import { DataService } from 'src/app/core/services/data.service';
import * as moment from 'moment';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { Router } from '@angular/router';
import { EventTypesModel } from 'src/app/core/models/event-types.model';
import {
  FacebookLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';

@Component({
  selector: 'app-add-future-event',
  templateUrl: './add-future-event.component.html',
  styleUrls: ['./add-future-event.component.scss'],
})
export class AddFutureEventComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;

  tomorrowDate = moment().add(1, 'day').toDate();
  uploadedFiles: any;
  futureEventData: Date;
  address: string;
  message: string;
  zipCode?: number;
  selectedEvent: EventTypesModel;
  eventTypes: EventTypesModel[] = [];
  eventName: string;
  fromTime: Date;
  toTime: Date;
  instagramTrigger: boolean = false;
  facebookTrigger: boolean = false;
  twitterTrigger: boolean = false;
  facebookAuthToken: string;
  loading = false;
  invalidZipCode = false;

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loadEventTypes();
    this.loadFaceBookAuthToken();
  }

  loadFaceBookAuthToken() {
    this.socialAuthService.authState.subscribe((user) => {
      this.facebookAuthToken = user.authToken;
      this.addNewFutureEvent();
    });
  }

  loadEventTypes() {
    this.dataService.getEventTypes().subscribe((data) => {
      this.eventTypes = data.eventTypes;
    });
  }

  myUploader(event: any) {
    for (let file of event.files) {
      this.uploadedFiles = file;
    }
  }

  clear() {
    this.fileUpload.clear();
    this.uploadedFiles = undefined;
  }

  facebookSignIn() {
    if (!this.facebookAuthToken) {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else {
      this.addNewFutureEvent();
    }
  }

  addNewFutureEvent() {
    this.loading = true;
    const data: EventRequestModel = new EventRequestModel();
    data.eventName = this.eventName;
    data.address = this.address;
    data.eventDate = moment(this.futureEventData).format('YYYY-MM-DD');
    data.latitude = '0.0';
    data.longitude = '0.0';
    data.message = this.message;
    data.zipCode = '' + this.zipCode;
    data.eventType = this.selectedEvent.Name;
    data.eventTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');

    data.postToInstagram = this.instagramTrigger;
    data.postToFacebook = this.facebookTrigger;
    data.facebookToken = this.facebookAuthToken;
    data.postToTwitter = this.twitterTrigger;

    this.dataService.createEvent(data, this.uploadedFiles).subscribe((data) => {
      this.loading = false;
      this.showSuccess();
    });
  }

  submitClicked() {
    if (this.instagramTrigger || this.facebookTrigger) {
      this.facebookSignIn();
    } else {
      this.addNewFutureEvent();
    }
  }

  disableSubmit(): boolean {
    return (
      !this.eventName ||
      !this.selectedEvent ||
      !this.futureEventData ||
      !this.fromTime ||
      !this.toTime ||
      !this.address ||
      !this.zipCode ||
      !this.message ||
      this.invalidZipCode
    );
  }

  showSuccess() {
    this.confirmationService.setConfirmation('Event Inserted');
    this.router.navigate(['/admin/future-events']);
  }

  validateZipCode() {
    this.invalidZipCode = ('' + this.zipCode).length != 5;
  }
}
