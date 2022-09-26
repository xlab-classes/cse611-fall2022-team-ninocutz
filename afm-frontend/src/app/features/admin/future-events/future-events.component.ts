import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { DataService } from 'src/app/core/services/data.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.scss'],
})
export class FutureEventsComponent implements OnInit {
  futureEvents: FutureEventsModel[] = [];
  faEdit = faEdit;

  constructor(
    private sharingService: SharingService,
    private dateService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.futureEvents = this.sharingService.getData();
    if (!this.futureEvents || this.futureEvents.length === 0) {
      this.fetchFutureEvents();
    }
  }

  fetchFutureEvents() {
    this.dateService.getAllFutureEvents().subscribe((data) => {
      setTimeout(() => {
        this.futureEvents = data;
      }, 1000);
    });
  }

  addNewFutureEvent() {
    this.router.navigate(['/admin/add-future-event']);
  }

  editFutureEvent(event: FutureEventsModel) {
    console.log(event);
  }
}
