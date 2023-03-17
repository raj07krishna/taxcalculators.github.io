import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegimeComponent } from './new-regime.component';

describe('NewRegimeComponent', () => {
  let component: NewRegimeComponent;
  let fixture: ComponentFixture<NewRegimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRegimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
