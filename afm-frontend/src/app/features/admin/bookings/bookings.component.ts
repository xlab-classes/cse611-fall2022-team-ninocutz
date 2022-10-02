import { Component, OnInit } from '@angular/core';
import { BookingsModel } from 'src/app/core/models/bookings.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  bookings: BookingsModel[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.dataService.getAllBookings().subscribe((data) => {
      this.bookings = data.bookings;
    });
  }
}
