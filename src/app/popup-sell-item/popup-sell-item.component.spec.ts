import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSellItemComponent } from './popup-sell-item.component';

describe('PopupSellItemComponent', () => {
  let component: PopupSellItemComponent;
  let fixture: ComponentFixture<PopupSellItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupSellItemComponent]
    });
    fixture = TestBed.createComponent(PopupSellItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
