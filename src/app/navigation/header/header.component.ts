import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth-service';
import {Observable, Subscription} from 'rxjs';
import * as fromRoot from "./../../app.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleOnClick = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;


  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {
    // this.authSubscription = this.authService.loginSubject.subscribe(
    //   authStatus => this.isAuth = authStatus
    // );
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated)
  }

  onToggle(){
    this.toggleOnClick.emit();
  }

  onLogout(){
    this.authService.logout();
  }

}
