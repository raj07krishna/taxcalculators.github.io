import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'services',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(module => module.LandingPageModule)
  },
  {
    path: 'advance-tax-calculator',
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: 'services'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
