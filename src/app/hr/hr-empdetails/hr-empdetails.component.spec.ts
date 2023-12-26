import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmpdetailsComponent } from './hr-empdetails.component';

describe('HrEmpdetailsComponent', () => {
  let component: HrEmpdetailsComponent;
  let fixture: ComponentFixture<HrEmpdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEmpdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrEmpdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
