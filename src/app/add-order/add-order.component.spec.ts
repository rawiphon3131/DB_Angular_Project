import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderComponent } from './add-order.component';

describe('AddOrderComponent', () => {
  let component: AddOrderComponent;
  let fixture: ComponentFixture<AddOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrderComponent]
    });
    fixture = TestBed.createComponent(AddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
