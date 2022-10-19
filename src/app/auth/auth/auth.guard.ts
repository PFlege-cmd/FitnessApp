import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot,} from "@angular/router";
import {AuthService} from "./auth-service";
import * as fromApp from "../../app.reducer";
import {Store} from "@ngrx/store";
import {take} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private authService: AuthService,
              private store: Store<fromApp.State>){}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.store.select(fromApp.getIsAuthenticated).pipe(take(1))
  }

  canLoad(route: Route) {
    return this.store.select(fromApp.getIsAuthenticated).pipe(take(1))
  }
}
