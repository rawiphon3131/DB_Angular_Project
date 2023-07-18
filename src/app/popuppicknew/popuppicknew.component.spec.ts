import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuppicknewComponent } from './popuppicknew.component';

describe('PopuppicknewComponent', () => {
  let component: PopuppicknewComponent;
  let fixture: ComponentFixture<PopuppicknewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopuppicknewComponent]
    });
    fixture = TestBed.createComponent(PopuppicknewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
