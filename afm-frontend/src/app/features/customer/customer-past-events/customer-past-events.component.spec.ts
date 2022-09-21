import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPastEventsComponent } from './customer-past-events.component';

describe('CustomerPastEventsComponent', () => {
  let component: CustomerPastEventsComponent;
  let fixture: ComponentFixture<CustomerPastEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPastEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPastEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
