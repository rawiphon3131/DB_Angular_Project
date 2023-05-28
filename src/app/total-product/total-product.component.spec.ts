import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProductComponent } from './total-product.component';

describe('TotalProductComponent', () => {
  let component: TotalProductComponent;
  let fixture: ComponentFixture<TotalProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalProductComponent]
    });
    fixture = TestBed.createComponent(TotalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
