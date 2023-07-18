import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsellComponent } from './add-newsell.component';

describe('AddNewsellComponent', () => {
  let component: AddNewsellComponent;
  let fixture: ComponentFixture<AddNewsellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewsellComponent]
    });
    fixture = TestBed.createComponent(AddNewsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
