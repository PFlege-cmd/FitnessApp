import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthData } from "./auth-data.model";
import { TrainingService } from "../../training/training.service";
import {UiService} from "../../shared/ui.service";




@Injectable()
export class AuthService{
  loginSubject = new Subject<boolean>();
  isAuthenticated = false;

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private matSnackBar: MatSnackBar,
              private uiService: UiService){
  }

  initAuthentificationState(){
    this.angularFireAuth.authState.subscribe(user=> {
      if (user){
        this.loginSubject.next(true);
        this.router.navigate(['/training']);
        this.isAuthenticated = true;
      } else {
        this.trainingService.cancelSubscriptions();
        this.loginSubject.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    })
  }

  registerUser(authData: AuthData){
    this.uiService.loadingSubject.next(true);
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        console.log(success);
      })
      .catch(error=> {
        this.uiService.showSnackbar(error.message, null, 3000);
      })
  }

  login(authData: AuthData){
    this.uiService.loadingSubject.next(true);
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password).then(success => {
      console.log(success);
    }).catch(error=> {
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  logout(){
    this.angularFireAuth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }
}
