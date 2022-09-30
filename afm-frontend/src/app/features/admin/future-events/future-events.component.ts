import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { DataService } from 'src/app/core/services/data.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.scss'],
  providers: [MessageService],
})
export class FutureEventsComponent implements OnInit, OnDestroy {
  futureEvents: FutureEventsModel[] = [];
  faEdit = faEdit;
  localStorageKey = 'future-events';

  constructor(
    private sharingService: SharingService,
    private dateService: DataService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.confirmationService.checkConfirmation()) {
      setTimeout(() => {
        this.showSuccess();
      }, 2000);
    }
    // Check if data is available from the sharingService
    this.futureEvents = this.sharingService.getData();
    if (!this.futureEvents || this.futureEvents.length === 0) {
      // Check if data is available from the localStorage
      this.futureEvents = this.sessionStorageService.getSessionStorage(
        this.localStorageKey
      );
      if (!this.futureEvents || this.futureEvents.length === 0) {
        this.fetchFutureEvents();
      }
    } else {
      this.saveInitialLoadData();
    }
  }

  ngOnDestroy(): void {
    this.sessionStorageService.removeSessionStorage(this.localStorageKey);
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Added Event',
    });
  }

  saveInitialLoadData() {
    this.sessionStorageService.setSessionStorage(
      this.localStorageKey,
      this.futureEvents
    );
  }

  fetchFutureEvents() {
    this.dateService.getAllFutureEvents().subscribe((data) => {
      this.futureEvents = data.events;
      this.saveInitialLoadData();
    });
  }

  addNewFutureEvent() {
    this.router.navigate(['/admin/add-future-event']);
  }

  editFutureEvent(event: FutureEventsModel) {
    this.sharingService.setData(event);
    this.router.navigate(['/admin/edit-future-event']);
  }
}
