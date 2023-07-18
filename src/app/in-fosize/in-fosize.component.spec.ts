import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InFosizeComponent } from './in-fosize.component';

describe('InFosizeComponent', () => {
  let component: InFosizeComponent;
  let fixture: ComponentFixture<InFosizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InFosizeComponent]
    });
    fixture = TestBed.createComponent(InFosizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
