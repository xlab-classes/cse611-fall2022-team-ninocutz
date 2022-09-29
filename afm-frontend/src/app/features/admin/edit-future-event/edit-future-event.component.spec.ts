import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFutureEventComponent } from './edit-future-event.component';

describe('EditFutureEventComponent', () => {
  let component: EditFutureEventComponent;
  let fixture: ComponentFixture<EditFutureEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFutureEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFutureEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
