import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockComponent } from './product-stock.component';

describe('ProductStockComponent', () => {
  let component: ProductStockComponent;
  let fixture: ComponentFixture<ProductStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductStockComponent]
    });
    fixture = TestBed.createComponent(ProductStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
