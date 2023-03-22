import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldTaxDetailsTableComponent } from './old-tax-details-table.component';

describe('OldTaxDetailsTableComponent', () => {
  let component: OldTaxDetailsTableComponent;
  let fixture: ComponentFixture<OldTaxDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldTaxDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldTaxDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
