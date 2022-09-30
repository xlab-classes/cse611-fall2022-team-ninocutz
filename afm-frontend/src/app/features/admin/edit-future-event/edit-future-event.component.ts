import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-edit-future-event',
  templateUrl: './edit-future-event.component.html',
  styleUrls: ['./edit-future-event.component.scss'],
})
export class EditFutureEventComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload') fileUpload: any;

  futureEvent: FutureEventsModel;
  uploadedFiles: any;
  localStorageKey = 'edit-future-event';

  constructor(
    private sharingService: SharingService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.sessionStorageService.removeSessionStorage(this.localStorageKey);
  }

  async myUploader(event: any) {
    // for (let file of event.files) {
    //   this.futureEvent.blob = await this.getBase64(file);
    // }
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
    this.futureEvent.Url = '';
    this.fileUpload.clear();
    this.uploadedFiles = undefined;
  }

  addNewFutureEvent() {}
}
