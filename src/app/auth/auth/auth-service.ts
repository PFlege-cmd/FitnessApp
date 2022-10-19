import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

import {AuthData} from "./auth-data.model";
import {TrainingService} from "../../training/training.service";
import {UiService} from "../../shared/ui.service";
import * as fromApp from '../../app.reducer';
import {UiStartAction, UiStopAction} from '../../shared/ui.actions';
import {Store} from "@ngrx/store";
import {SetAuthAction, SetUnauthAction} from "./auth.actions";


@Injectable()
export class AuthService{

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private matSnackBar: MatSnackBar,
              private uiService: UiService,
              private store: Store<{state: fromApp.State}>){
  }

  initAuthentificationState(){
    this.angularFireAuth.authState.subscribe(user=> {
      if (user){
        this.store.dispatch(new SetAuthAction());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new SetUnauthAction());
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData){
    this.store.dispatch(new UiStartAction());
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        this.store.dispatch(new UiStopAction());
        console.log(success);
      })
      .catch(error=> {
        this.uiService.showSnackbar(error.message, null, 3000);
      })
  }

  login(authData: AuthData){
    this.store.dispatch(new UiStartAction())
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password).then(success => {
      this.store.dispatch(new UiStopAction());
      console.log(success);
    }).catch(error=> {
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  logout(){
    this.angularFireAuth.signOut();
  }
}
