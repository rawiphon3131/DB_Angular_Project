import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderListComponent } from './add-order-list.component';

describe('AddOrderListComponent', () => {
  let component: AddOrderListComponent;
  let fixture: ComponentFixture<AddOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrderListComponent]
    });
    fixture = TestBed.createComponent(AddOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
