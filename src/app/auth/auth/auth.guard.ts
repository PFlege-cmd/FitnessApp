import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth-service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
    private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    if(!this.authService.isAuth()){
      return false;
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  }

}
