import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmButtonComponent } from './afm-button.component';

describe('AfmButtonComponent', () => {
  let component: AfmButtonComponent;
  let fixture: ComponentFixture<AfmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfmButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
