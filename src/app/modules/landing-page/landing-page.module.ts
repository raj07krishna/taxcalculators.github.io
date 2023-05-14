import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { LandingPageComponent } from './landing-page.component';
import { CatalogueCardModule } from '../../utils/modules/catalogue-card/catalogue-card.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatIconModule,
    CatalogueCardModule
  ]
})
export class LandingPageModule { }
