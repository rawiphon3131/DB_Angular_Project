import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCusinfoComponent } from './edit-cusinfo.component';

describe('EditCusinfoComponent', () => {
  let component: EditCusinfoComponent;
  let fixture: ComponentFixture<EditCusinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCusinfoComponent]
    });
    fixture = TestBed.createComponent(EditCusinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
