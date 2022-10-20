import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationsModel } from 'src/app/core/models/notifications.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [MessageService],
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationsModel[] = [];
  loading = false;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.dataService.getAllNotifications().subscribe((data) => {
      this.notifications = data.notifications;
    });
  }

  updateTemplate(template: NotificationsModel) {
    this.loading = true;
    this.dataService.updateNotification(template).subscribe((data) => {
      this.loading = false;
      this.showSuccess();
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Updated Notification',
    });
  }
}
