import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOrderPreComponent } from './popup-order-pre.component';

describe('PopupOrderPreComponent', () => {
  let component: PopupOrderPreComponent;
  let fixture: ComponentFixture<PopupOrderPreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupOrderPreComponent]
    });
    fixture = TestBed.createComponent(PopupOrderPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
