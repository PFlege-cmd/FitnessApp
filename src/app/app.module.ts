import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';

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
import {environment} from "../environments/environment";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import {AuthModule} from "./auth/auth/auth.module";
import {TrainingModule} from "./training/training.module";
import {AuthRoutingModule} from "./auth/auth/auth-routing.module";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    FormsModule,
    AuthModule,
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
})
export class AppModule { }
