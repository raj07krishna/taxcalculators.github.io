import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperOldRegimeComponent } from './stepper-old-regime.component';

describe('StepperOldRegimeComponent', () => {
  let component: StepperOldRegimeComponent;
  let fixture: ComponentFixture<StepperOldRegimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperOldRegimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperOldRegimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
