import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { BookingsModel } from 'src/app/core/models/bookings.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
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

  approveRequest(booking: BookingsModel) {
    this.dataService.approveBookingRequest(booking.Id).subscribe((data) => {
      this.getAllBookings();
    });
  }

  declineRequest(booking: BookingsModel) {
    this.dataService.declineBookingRequest(booking.Id).subscribe((data) => {
      this.getAllBookings();
    });
  }
}
