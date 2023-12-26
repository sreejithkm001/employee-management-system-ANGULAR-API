import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveDataComponent } from './emp-leave-data.component';

describe('EmpLeaveDataComponent', () => {
  let component: EmpLeaveDataComponent;
  let fixture: ComponentFixture<EmpLeaveDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpLeaveDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpLeaveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
