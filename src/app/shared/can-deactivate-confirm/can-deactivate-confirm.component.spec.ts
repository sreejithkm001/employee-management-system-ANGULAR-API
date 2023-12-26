import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanDeactivateConfirmComponent } from './can-deactivate-confirm.component';

describe('CanDeactivateConfirmComponent', () => {
  let component: CanDeactivateConfirmComponent;
  let fixture: ComponentFixture<CanDeactivateConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanDeactivateConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanDeactivateConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
