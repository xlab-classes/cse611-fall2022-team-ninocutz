import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventRequestModel } from 'src/app/core/models/event-request.model';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { DataService } from 'src/app/core/services/data.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-edit-future-event',
  templateUrl: './edit-future-event.component.html',
  styleUrls: ['./edit-future-event.component.scss'],
})
export class EditFutureEventComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload') fileUpload: any;

  tomorrowDate = moment().add(1, 'day').toDate();
  futureEvent: FutureEventsModel;
  eventTypes: any[] = [];
  uploadedFiles: any;
  localStorageKey = 'edit-future-event';
  selectedEvent: any;
  fromTime: Date = new Date();
  toTime: Date = new Date();
  eventDate: Date = new Date();

  constructor(
    private sharingService: SharingService,
    private sessionStorageService: SessionStorageService,
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventTypes = [
      { name: 'Wedding', code: 'Wedding' },
      { name: 'Club', code: 'Club' },
    ];

    this.futureEvent = this.sharingService.getData();
    if (this.futureEvent) {
      this.sessionStorageService.setSessionStorage(
        this.localStorageKey,
        this.futureEvent
      );
    } else {
      this.futureEvent = this.sessionStorageService.getSessionStorage(
        this.localStorageKey
      );
    }
    this.updateDisplay();
  }

  ngOnDestroy(): void {
    this.sessionStorageService.removeSessionStorage(this.localStorageKey);
  }

  updateDisplay() {
    this.selectedEvent = this.eventTypes
      .filter((x) => x.code === this.futureEvent.EventType)
      .shift();

    this.eventDate = new Date(this.futureEvent.EventDate);

    const timeSlot = this.futureEvent.EventTimeSlot?.split('-');
    if (timeSlot) {
      const fromTimeTemp = timeSlot[0].split(':');
      this.fromTime.setHours(+fromTimeTemp[0]);
      this.fromTime.setMinutes(+fromTimeTemp[1]);

      const toTimeTemp = timeSlot[1].split(':');
      this.toTime.setHours(+toTimeTemp[0]);
      this.toTime.setMinutes(+toTimeTemp[1]);
    }
  }

  async myUploader(event: any) {
    for (let file of event.files) {
      this.uploadedFiles = file;
    }
  }

  getBase64(file: any): Promise<any> {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = function () {
        resolve(reader.result);
      };
    });
  }

  clear() {
    this.futureEvent.Url = undefined;
    this.fileUpload.clear();
    this.uploadedFiles = undefined;
  }

  editFutureEvent() {
    const data: EventRequestModel = new EventRequestModel();
    data.eventName = this.futureEvent.Name;
    data.address = this.futureEvent.Address;
    data.eventDate = moment(this.eventDate).format('YYYY-MM-DD');
    data.latitude = '0.0';
    data.longitude = '0.0';
    data.message = this.futureEvent.Message ?? '';
    data.zipCode = this.futureEvent.Zipcode;
    data.eventType = this.selectedEvent.code;
    data.eventTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');

    this.dataService
      .editFutureEvent('' + this.futureEvent.Id, data, this.uploadedFiles)
      .subscribe((data) => {
        this.showSuccess();
      });
  }

  showSuccess() {
    this.confirmationService.setConfirmation('edited');
    this.router.navigate(['/admin/future-events']);
  }
}
