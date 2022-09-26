import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFutureEventComponent } from './add-future-event.component';

describe('AddFutureEventComponent', () => {
  let component: AddFutureEventComponent;
  let fixture: ComponentFixture<AddFutureEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFutureEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFutureEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
