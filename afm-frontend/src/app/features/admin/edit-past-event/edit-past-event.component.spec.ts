import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPastEventComponent } from './edit-past-event.component';

describe('EditPastEventComponent', () => {
  let component: EditPastEventComponent;
  let fixture: ComponentFixture<EditPastEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPastEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPastEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
