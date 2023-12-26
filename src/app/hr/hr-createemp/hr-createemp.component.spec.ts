import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCreateempComponent } from './hr-createemp.component';

describe('HrCreateempComponent', () => {
  let component: HrCreateempComponent;
  let fixture: ComponentFixture<HrCreateempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrCreateempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrCreateempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
