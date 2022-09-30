import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureEventRequestModel } from 'src/app/core/models/future-event-request.model';
import { DataService } from 'src/app/core/services/data.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-future-event',
  templateUrl: './add-future-event.component.html',
  styleUrls: ['./add-future-event.component.scss'],
  providers: [MessageService],
})
export class AddFutureEventComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;

  uploadedFiles: any;
  futureEventData: Date;
  address: string;
  message: string;
  zipCode: number;
  selectedEvent: any;
  eventTypes: any[] = [];

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.eventTypes = [
      { name: 'Wedding', code: 'Wedding' },
      { name: 'Wedding', code: 'Wedding' },
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

  async addNewFutureEvent() {
    const data: FutureEventRequestModel = new FutureEventRequestModel();

    data.address = this.address;
    data.event_date = moment(this.futureEventData).format(
      'YYYY-MM-DD'
    );
    data.latitude = '51.000000';
    data.longitude = '51.000000';
    data.message = this.message;
    data.zip_code = '' + this.zipCode;
    data.event_type = this.selectedEvent.code;
    data.email_id = 'Test@Test.com';

    await this.dataService
      .addFutureEvent(data, this.uploadedFiles)
      .subscribe((data) => {
        this.showSuccess();
      });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Added Event',
    });
  }
}
