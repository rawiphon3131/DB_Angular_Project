import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPopupComponent } from './product-popup.component';

describe('ProductPopupComponent', () => {
  let component: ProductPopupComponent;
  let fixture: ComponentFixture<ProductPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPopupComponent]
    });
    fixture = TestBed.createComponent(ProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
