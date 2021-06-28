import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationComponent } from './components/classification/classification.component';
import { LandingComponent } from './components/landing/landing.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'classification', component: ClassificationComponent },
  { path: '**', redirectTo: '/landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
