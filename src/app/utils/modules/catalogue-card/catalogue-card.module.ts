import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueCardComponent } from './catalogue-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    CatalogueCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  exports: [CatalogueCardComponent]
})
export class CatalogueCardModule { }
