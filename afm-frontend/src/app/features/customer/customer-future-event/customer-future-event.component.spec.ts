import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFutureEventComponent } from './customer-future-event.component';

describe('CustomerFutureEventComponent', () => {
  let component: CustomerFutureEventComponent;
  let fixture: ComponentFixture<CustomerFutureEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFutureEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFutureEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
