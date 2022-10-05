import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventRequestModel } from 'src/app/core/models/event-request.model';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-add-past-event',
  templateUrl: './add-past-event.component.html',
  styleUrls: ['./add-past-event.component.scss'],
})
export class AddPastEventComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;

  yesterdayDate = moment().subtract(1, 'day').toDate();
  uploadedFiles: any;
  pastEventDate: Date;
  address: string;
  message: string;
  zipCode?: number;
  selectedEvent: any;
  eventTypes: any[] = [];
  eventName: string;
  fromTime: Date;
  toTime: Date;

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventTypes = [
      { name: 'Wedding', code: 'Wedding' },
      { name: 'Club', code: 'Club' },
    ];
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

  addNewPastEvent() {
    const data: EventRequestModel = new EventRequestModel();
    data.eventName = this.eventName;
    data.address = this.address;
    data.eventDate = moment(this.pastEventDate).format('YYYY-MM-DD');
    data.latitude = '0.0';
    data.longitude = '0.0';
    data.message = this.message;
    data.zipCode = '' + this.zipCode;
    data.eventType = this.selectedEvent.code;
    data.eventTimeSlot =
      moment(this.fromTime).format('HH:mm') +
      '-' +
      moment(this.toTime).format('HH:mm');

    this.dataService.createEvent(data, this.uploadedFiles).subscribe((data) => {
      this.showSuccess();
    });
  }

  showSuccess() {
    this.confirmationService.setConfirmation('inserted');
    this.router.navigate(['/admin/past-events']);
  }
}
