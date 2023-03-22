import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaxDetailsTableComponent } from './new-tax-details-table.component';

describe('NewTaxDetailsTableComponent', () => {
  let component: NewTaxDetailsTableComponent;
  let fixture: ComponentFixture<NewTaxDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaxDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaxDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
