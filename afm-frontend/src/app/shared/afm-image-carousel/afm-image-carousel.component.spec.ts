import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmImageCarouselComponent } from './afm-image-carousel.component';

describe('AfmImageCarouselComponent', () => {
  let component: AfmImageCarouselComponent;
  let fixture: ComponentFixture<AfmImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfmImageCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfmImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
