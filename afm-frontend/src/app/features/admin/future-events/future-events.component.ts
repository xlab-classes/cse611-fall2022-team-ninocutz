import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { DataService } from 'src/app/core/services/data.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.scss'],
})
export class FutureEventsComponent implements OnInit, OnDestroy {
  futureEvents: FutureEventsModel[] = [];
  faEdit = faEdit;
  localStorageKey = 'future-events';

  constructor(
    private sharingService: SharingService,
    private dateService: DataService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // Check if data is available from the sharingService
    this.futureEvents = this.sharingService.getData();
    if (!this.futureEvents || this.futureEvents.length === 0) {
      // Check if data is available from the localStorage
      this.futureEvents = this.localStorageService.getLocalStorage(
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
    this.localStorageService.removeLocalStorage(this.localStorageKey);
  }

  saveInitialLoadData() {
    this.localStorageService.setLocalStorage(
      this.localStorageKey,
      this.futureEvents
    );
  }

  fetchFutureEvents() {
    this.dateService.getAllFutureEvents().subscribe((data) => {
      setTimeout(() => {
        this.futureEvents = data;
        this.saveInitialLoadData();
      }, 1000);
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
