import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialsModule} from './materials.module';
import {AuthComponent} from './auth/auth/auth.component';
import {WelcomeComponent} from './welcome/welcome/welcome.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {AuthService} from './auth/auth/auth-service';
import {TrainingService} from './training/training.service';
import {environment} from "../environments/environment";
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {AuthModule} from "./auth/auth/auth.module";
import {AuthRoutingModule} from "./auth/auth/auth-routing.module";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {StoreModule} from "@ngrx/store";
import * as fromReducer from './app.reducer'
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "./shared/shared.module";

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
        StoreModule.forRoot(
            fromReducer.reducers
        ),
        SharedModule
    ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
})
export class AppModule { }
