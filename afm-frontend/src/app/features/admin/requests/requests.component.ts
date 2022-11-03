import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BookingsModel } from 'src/app/core/models/bookings.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  providers: [MessageService],
})
export class RequestsComponent implements OnInit {
  @ViewChild('requestTable') requestTable: Table;
  bookings: BookingsModel[];

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

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
      this.showSuccessMessage();
    });
  }

  declineRequest(booking: BookingsModel) {
    this.dataService.declineBookingRequest(booking.Id).subscribe((data) => {
      this.getAllBookings();
      this.showSuccessMessage(false);
    });
  }

  showSuccessMessage(accepted = true) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail:
        'Request ' + accepted ? ' accepted ' : ' declined ' + 'successfully',
    });
  }
}
