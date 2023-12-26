import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DoughnutComponent } from './d3-doughnut.component';

describe('D3DoughnutComponent', () => {
  let component: D3DoughnutComponent;
  let fixture: ComponentFixture<D3DoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3DoughnutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3DoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
