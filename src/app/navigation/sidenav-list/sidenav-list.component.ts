import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth-service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService
    .loginSubject
    .subscribe(authStatus => this.isAuth = authStatus)
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onClose(){
    this.closeSidenav.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }

}
