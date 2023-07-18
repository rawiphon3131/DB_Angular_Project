import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprdtotableComponent } from './addprdtotable.component';

describe('AddprdtotableComponent', () => {
  let component: AddprdtotableComponent;
  let fixture: ComponentFixture<AddprdtotableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddprdtotableComponent]
    });
    fixture = TestBed.createComponent(AddprdtotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
