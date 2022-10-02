import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPastEventComponent } from './add-past-event.component';

describe('AddPastEventComponent', () => {
  let component: AddPastEventComponent;
  let fixture: ComponentFixture<AddPastEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPastEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPastEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
