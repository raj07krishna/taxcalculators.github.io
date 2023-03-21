import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldRegimeMediumComponent } from './old-regime-medium.component';

describe('OldRegimeMediumComponent', () => {
  let component: OldRegimeMediumComponent;
  let fixture: ComponentFixture<OldRegimeMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldRegimeMediumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldRegimeMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
