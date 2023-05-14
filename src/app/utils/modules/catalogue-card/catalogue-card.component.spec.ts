import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueCardComponent } from './catalogue-card.component';

describe('CatalogueCardComponent', () => {
  let component: CatalogueCardComponent;
  let fixture: ComponentFixture<CatalogueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
