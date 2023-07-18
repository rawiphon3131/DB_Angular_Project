import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderPreComponent } from './detail-order-pre.component';

describe('DetailOrderPreComponent', () => {
  let component: DetailOrderPreComponent;
  let fixture: ComponentFixture<DetailOrderPreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailOrderPreComponent]
    });
    fixture = TestBed.createComponent(DetailOrderPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
