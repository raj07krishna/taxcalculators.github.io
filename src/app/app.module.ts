import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OldRegimeComponent } from './components/old-regime/old-regime.component';
import { NewRegimeComponent } from './components/new-regime/new-regime.component';
import { StepperOldRegimeComponent } from './stepper-old-regime/stepper-old-regime.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { OldRegimeMediumComponent } from './components/old-regime-medium/old-regime-medium.component';
import { NewTaxDetailsTableComponent } from './components/new-tax-details-table/new-tax-details-table.component';
import { OldTaxDetailsTableComponent } from './components/old-tax-details-table/old-tax-details-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OldRegimeComponent,
    NewRegimeComponent,
    StepperOldRegimeComponent,
    OldRegimeMediumComponent,
    NewTaxDetailsTableComponent,
    OldTaxDetailsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    NgChartsModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
