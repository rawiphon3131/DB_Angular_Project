import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSellComponent } from './report-sell.component';

describe('ReportSellComponent', () => {
  let component: ReportSellComponent;
  let fixture: ComponentFixture<ReportSellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportSellComponent]
    });
    fixture = TestBed.createComponent(ReportSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
