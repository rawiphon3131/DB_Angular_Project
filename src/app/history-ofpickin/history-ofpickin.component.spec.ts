import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfpickinComponent } from './history-ofpickin.component';

describe('HistoryOfpickinComponent', () => {
  let component: HistoryOfpickinComponent;
  let fixture: ComponentFixture<HistoryOfpickinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryOfpickinComponent]
    });
    fixture = TestBed.createComponent(HistoryOfpickinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
