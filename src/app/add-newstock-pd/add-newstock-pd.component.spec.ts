import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewstockPdComponent } from './add-newstock-pd.component';

describe('AddNewstockPdComponent', () => {
  let component: AddNewstockPdComponent;
  let fixture: ComponentFixture<AddNewstockPdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewstockPdComponent]
    });
    fixture = TestBed.createComponent(AddNewstockPdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
