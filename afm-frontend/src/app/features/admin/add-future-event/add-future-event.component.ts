import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureEventRequestModel } from 'src/app/core/models/future-event-request.model';
import { DataService } from 'src/app/core/services/data.service';
import * as moment from 'moment';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-future-event',
  templateUrl: './add-future-event.component.html',
  styleUrls: ['./add-future-event.component.scss'],
})
export class AddFutureEventComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;

  uploadedFiles: any;
  futureEventData: Date;
  address: string;
  message: string;
  zipCode?: number;
  selectedEvent: any;
  eventTypes: any[] = [];

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

  async addNewFutureEvent() {
    const data: FutureEventRequestModel = new FutureEventRequestModel();

    data.address = this.address;
    data.event_date = moment(this.futureEventData).format('YYYY-MM-DD');
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
    this.confirmationService.setConfirmation(true);
    this.router.navigate(['/admin/future-events']);
  }

  // clearAllData() {
  //   this.clear();
  //   // this.futureEventData = ;
  //   this.address = '';
  //   this.message = '';
  //   this.zipCode = undefined;
  //   this.selectedEvent = {};
  // }
}
