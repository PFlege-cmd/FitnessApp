import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleOnClick = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;


  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.loginSubject.subscribe(
      authStatus => this.isAuth = authStatus
    );
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  onToggle(){
    this.toggleOnClick.emit();
  }

  onLogout(){
    this.authService.logout();
  }

}
