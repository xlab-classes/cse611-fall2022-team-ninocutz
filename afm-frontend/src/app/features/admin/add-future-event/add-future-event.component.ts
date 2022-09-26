import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-future-event',
  templateUrl: './add-future-event.component.html',
  styleUrls: ['./add-future-event.component.scss'],
})
export class AddFutureEventComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;

  uploadedFiles: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  myUploader(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  clear() {
    this.fileUpload.clear();
    this.uploadedFiles.length = 0;
  }

  addNewFutureEvent() {}
}
