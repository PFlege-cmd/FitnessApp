import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
