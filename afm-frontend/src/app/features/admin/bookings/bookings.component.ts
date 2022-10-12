import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { BookingsModel } from 'src/app/core/models/bookings.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  @ViewChild('requestTable') requestTable: Table;
  bookings: BookingsModel[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllBookings();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.requestTable.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  getAllBookings() {
    this.dataService.getAllBookings().subscribe((data) => {
      this.bookings = data.bookings;
    });
  }
}
