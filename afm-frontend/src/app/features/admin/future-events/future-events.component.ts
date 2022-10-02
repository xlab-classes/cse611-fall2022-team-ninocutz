import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { DataService } from 'src/app/core/services/data.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.scss'],
  providers: [MessageService],
})
export class FutureEventsComponent implements OnInit {
  futureEvents: FutureEventsModel[] = [];
  faEdit = faEdit;
  localStorageKey = 'future-events';

  constructor(
    private sharingService: SharingService,
    private dateService: DataService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.confirmationService.checkConfirmation()) {
      setTimeout(() => {
        this.showSuccess();
      }, 2000);
    }
    this.fetchFutureEvents();
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Added Event',
    });
  }

  fetchFutureEvents() {
    this.dateService.getAllFutureEvents().subscribe((data) => {
      this.futureEvents = data.events;
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
