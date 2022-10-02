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
    if (this.confirmationService.checkConfirmation()) {
      setTimeout(() => {
        this.showSuccess();
      }, 2000);
    }
    this.getAllPastEvents();
  }

  getAllPastEvents() {
    this.dataService.getAllPastEvents().subscribe((data) => {
      this.pastEvents = data.events;
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Added Event',
    });
  }

  addNewPastEvent() {
    this.router.navigate(['/admin/add-past-event']);
  }

  editPastEvent(event: PastEventsModel) {
    this.sharingService.setData(event);
    this.router.navigate(['/admin/edit-past-event']);
  }
}
