import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderPopupComponent } from './add-order-popup.component';

describe('AddOrderPopupComponent', () => {
  let component: AddOrderPopupComponent;
  let fixture: ComponentFixture<AddOrderPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrderPopupComponent]
    });
    fixture = TestBed.createComponent(AddOrderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
