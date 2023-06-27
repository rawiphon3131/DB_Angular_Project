import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNamePdComponent } from './add-name-pd.component';

describe('AddNamePdComponent', () => {
  let component: AddNamePdComponent;
  let fixture: ComponentFixture<AddNamePdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNamePdComponent]
    });
    fixture = TestBed.createComponent(AddNamePdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
