import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDebtComponent } from './customer-debt.component';

describe('CustomerDebtComponent', () => {
  let component: CustomerDebtComponent;
  let fixture: ComponentFixture<CustomerDebtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDebtComponent]
    });
    fixture = TestBed.createComponent(CustomerDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
