import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldRegimeComponent } from './old-regime.component';

describe('OldRegimeComponent', () => {
  let component: OldRegimeComponent;
  let fixture: ComponentFixture<OldRegimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldRegimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldRegimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
