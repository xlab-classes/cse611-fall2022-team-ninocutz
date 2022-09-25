import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmBlurBackgroundComponent } from './afm-blur-background.component';

describe('AfmBlurBackgroundComponent', () => {
  let component: AfmBlurBackgroundComponent;
  let fixture: ComponentFixture<AfmBlurBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfmBlurBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfmBlurBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
