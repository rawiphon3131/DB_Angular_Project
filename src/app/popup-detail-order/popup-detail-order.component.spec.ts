import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetailOrderComponent } from './popup-detail-order.component';

describe('PopupDetailOrderComponent', () => {
  let component: PopupDetailOrderComponent;
  let fixture: ComponentFixture<PopupDetailOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupDetailOrderComponent]
    });
    fixture = TestBed.createComponent(PopupDetailOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
