import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CurrentEventModel } from 'src/app/core/models/current-event.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
  providers: [MessageService],
})
export class CustomerHomeComponent implements OnInit {
  currentEvent: CurrentEventModel | undefined;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCurrentLocationOfRv();
  }

  getCurrentLocationOfRv() {
    this.dataService.getCurrentLocation().subscribe((data) => {
      this.currentEvent = data.events ? data.events[0] : undefined;
    });
  }
}
