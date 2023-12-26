import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPersonalDataComponent } from './emp-personal-data.component';

describe('EmpPersonalDataComponent', () => {
  let component: EmpPersonalDataComponent;
  let fixture: ComponentFixture<EmpPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPersonalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
