import { getMatInputUnsupportedTypeError } from "@angular/material/input";
import { Subject } from "rxjs";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { createInjectableType } from "@angular/compiler";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class AuthService{
  private user? : User;
  loginSubject = new Subject<boolean>();

  constructor(private router: Router){

  }

  registerUser(authData: AuthData,){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
    this.loginOrAuthenticate();
  }

  login(authData: AuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    };
    this.loginOrAuthenticate();
  }

  logout(){
    this.user = undefined;
    this.loginSubject.next(false);
  }

  isAuth(){
    return this.user != undefined;
  }

  getUser(){
    return {
      ...this.user
    };
  }

  private loginOrAuthenticate() {
    this.loginSubject.next(true);
    this.router.navigate(['/training']);
  }
}
