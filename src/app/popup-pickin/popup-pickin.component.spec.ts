import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPickinComponent } from './popup-pickin.component';

describe('PopupPickinComponent', () => {
  let component: PopupPickinComponent;
  let fixture: ComponentFixture<PopupPickinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupPickinComponent]
    });
    fixture = TestBed.createComponent(PopupPickinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
