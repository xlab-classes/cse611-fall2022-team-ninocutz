import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPastEventComponent } from './customer-past-event.component';

describe('CustomerPastEventComponent', () => {
  let component: CustomerPastEventComponent;
  let fixture: ComponentFixture<CustomerPastEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPastEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPastEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
