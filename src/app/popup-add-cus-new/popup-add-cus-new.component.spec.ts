import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddCusNewComponent } from './popup-add-cus-new.component';

describe('PopupAddCusNewComponent', () => {
  let component: PopupAddCusNewComponent;
  let fixture: ComponentFixture<PopupAddCusNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupAddCusNewComponent]
    });
    fixture = TestBed.createComponent(PopupAddCusNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
