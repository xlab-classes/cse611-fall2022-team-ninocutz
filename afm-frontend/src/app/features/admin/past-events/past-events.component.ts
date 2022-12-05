import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { PastEventsModel } from 'src/app/core/models/past-events.model';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { DataService } from 'src/app/core/services/data.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss'],
  providers: [MessageService],
})
export class PastEventsComponent implements OnInit {
  faEdit = faEdit;
  pastEvents: PastEventsModel[] = [];

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private sharingService: SharingService
  ) {}

  ngOnInit(): void {
    const confirmationMessage = this.confirmationService.checkConfirmation();
    this.getAllPastEvents();
    if (confirmationMessage) {
      setTimeout(() => {
        this.showSuccess(confirmationMessage);
      }, 1000);
    }
  }

  getAllPastEvents() {
    this.dataService.getAllPastEvents().subscribe((data) => {
      this.pastEvents = data.events;
    });
  }

  showSuccess(confirmationMessage: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: confirmationMessage,
    });
  }

  addNewPastEvent() {
    this.router.navigate(['/admin/add-past-event']);
  }

  editPastEvent(event: PastEventsModel) {
    this.sharingService.setData(event);
    this.router.navigate(['/admin/edit-past-event']);
  }

  getEditPastEventDivId(event: PastEventsModel): string {
    return 'editPastEvent-' + this.pastEvents.indexOf(event);
  }
}
