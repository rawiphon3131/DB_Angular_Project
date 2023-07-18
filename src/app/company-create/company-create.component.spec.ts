import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreateComponent } from './company-create.component';

describe('CompanyCreateComponent', () => {
  let component: CompanyCreateComponent;
  let fixture: ComponentFixture<CompanyCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyCreateComponent]
    });
    fixture = TestBed.createComponent(CompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
