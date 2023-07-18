import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPreorderComponent } from './status-preorder.component';

describe('StatusPreorderComponent', () => {
  let component: StatusPreorderComponent;
  let fixture: ComponentFixture<StatusPreorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusPreorderComponent]
    });
    fixture = TestBed.createComponent(StatusPreorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
