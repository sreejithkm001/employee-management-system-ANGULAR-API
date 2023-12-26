import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAcademicDataComponent } from './emp-academic-data.component';

describe('EmpAcademicDataComponent', () => {
  let component: EmpAcademicDataComponent;
  let fixture: ComponentFixture<EmpAcademicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpAcademicDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAcademicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
