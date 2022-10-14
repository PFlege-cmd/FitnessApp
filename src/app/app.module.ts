import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './materials.module';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './login/login/login.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { SignupComponent } from './signup/signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import  {StopTrainingComponent} from './training/current-training/stop-training.component';
import { AuthService } from './auth/auth/auth-service';
import { TrainingService } from './training/training.service';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    FormsModule
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
