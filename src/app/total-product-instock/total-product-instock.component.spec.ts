import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProductINstockComponent } from './total-product-instock.component';

describe('TotalProductINstockComponent', () => {
  let component: TotalProductINstockComponent;
  let fixture: ComponentFixture<TotalProductINstockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalProductINstockComponent]
    });
    fixture = TestBed.createComponent(TotalProductINstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
