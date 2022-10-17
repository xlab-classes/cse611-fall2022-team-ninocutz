import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLocationComponent } from './current-location.component';

describe('CurrentLocationComponent', () => {
  let component: CurrentLocationComponent;
  let fixture: ComponentFixture<CurrentLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
