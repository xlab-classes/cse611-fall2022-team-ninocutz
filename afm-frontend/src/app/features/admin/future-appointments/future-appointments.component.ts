import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppointmentsModel } from 'src/app/core/models/appointments.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-future-appointments',
  templateUrl: './future-appointments.component.html',
  styleUrls: ['./future-appointments.component.scss'],
  providers: [MessageService],
})
export class FutureAppointmentsComponent implements OnInit {
  @ViewChild('appointmentsTable') appointmentsTable: Table;
  appointments: AppointmentsModel[];

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

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
        this.showSuccessMessage();
      });
  }

  declineRequest(appointment: AppointmentsModel) {
    this.dataService
      .declineAppointmentRequest(appointment.Id)
      .subscribe((data) => {
        this.getAllAppointments();
        this.showSuccessMessage(false);
      });
  }

  showSuccessMessage(accepted = true) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail:
        'Event ' + accepted ? ' accepted ' : ' declined ' + 'successfully',
    });
  }
}
