import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFutureEventsComponent } from './customer-future-events.component';

describe('CustomerFutureEventsComponent', () => {
  let component: CustomerFutureEventsComponent;
  let fixture: ComponentFixture<CustomerFutureEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFutureEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFutureEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
