import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AppointmentsModel } from 'src/app/core/models/appointments.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-future-appointments',
  templateUrl: './future-appointments.component.html',
  styleUrls: ['./future-appointments.component.scss'],
})
export class FutureAppointmentsComponent implements OnInit {
  @ViewChild('appointmentsTable') appointmentsTable: Table;
  appointments: AppointmentsModel[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllAppointments();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.appointmentsTable.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  getAllAppointments() {
    this.dataService.getAllAppointments().subscribe((data) => {
      this.appointments = data.appointments;
    });
  }

  approveRequest(appointment: AppointmentsModel) {
    this.dataService
      .approveAppointmentRequest(appointment.Id)
      .subscribe((data) => {
        this.getAllAppointments();
      });
  }

  declineRequest(appointment: AppointmentsModel) {
    this.dataService
      .declineAppointmentRequest(appointment.Id)
      .subscribe((data) => {
        this.getAllAppointments();
      });
  }
}
