import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickinOrderPreComponent } from './pickin-order-pre.component';

describe('PickinOrderPreComponent', () => {
  let component: PickinOrderPreComponent;
  let fixture: ComponentFixture<PickinOrderPreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickinOrderPreComponent]
    });
    fixture = TestBed.createComponent(PickinOrderPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
