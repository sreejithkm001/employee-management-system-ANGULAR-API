import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveapplyComponent } from './emp-leaveapply.component';

describe('EmpLeaveapplyComponent', () => {
  let component: EmpLeaveapplyComponent;
  let fixture: ComponentFixture<EmpLeaveapplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpLeaveapplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpLeaveapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
