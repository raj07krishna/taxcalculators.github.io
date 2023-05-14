import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalScrollerComponent } from './horizontal-scroller.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    HorizontalScrollerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [HorizontalScrollerComponent]
})
export class HorizontalScrollerModule { }
