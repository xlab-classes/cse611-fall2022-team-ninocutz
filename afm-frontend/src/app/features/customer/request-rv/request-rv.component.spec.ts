import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRvComponent } from './request-rv.component';

describe('RequestRvComponent', () => {
  let component: RequestRvComponent;
  let fixture: ComponentFixture<RequestRvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
