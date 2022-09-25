import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmImageComponent } from './afm-image.component';

describe('AfmImageComponent', () => {
  let component: AfmImageComponent;
  let fixture: ComponentFixture<AfmImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfmImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfmImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
