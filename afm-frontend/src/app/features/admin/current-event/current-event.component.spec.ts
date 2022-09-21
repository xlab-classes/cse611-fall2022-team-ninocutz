import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventComponent } from './current-event.component';

describe('CurrentEventComponent', () => {
  let component: CurrentEventComponent;
  let fixture: ComponentFixture<CurrentEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
