import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickinProductComponent } from './pickin-product.component';

describe('PickinProductComponent', () => {
  let component: PickinProductComponent;
  let fixture: ComponentFixture<PickinProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickinProductComponent]
    });
    fixture = TestBed.createComponent(PickinProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
