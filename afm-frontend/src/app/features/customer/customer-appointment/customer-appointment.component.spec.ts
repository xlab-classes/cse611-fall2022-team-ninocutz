import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppointmentComponent } from './customer-appointment.component';

describe('CustomerAppointmentComponent', () => {
  let component: CustomerAppointmentComponent;
  let fixture: ComponentFixture<CustomerAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
