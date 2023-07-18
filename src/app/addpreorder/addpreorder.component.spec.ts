import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpreorderComponent } from './addpreorder.component';

describe('AddpreorderComponent', () => {
  let component: AddpreorderComponent;
  let fixture: ComponentFixture<AddpreorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpreorderComponent]
    });
    fixture = TestBed.createComponent(AddpreorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
