import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'src/app/auth/auth/auth-service';
import {Observable} from "rxjs";
import {UiService} from "../../shared/ui.service";
import * as fromRoot from '../../app.reducer';
import {getIsLoading} from '../../app.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }

  onSubmit(loginForm: NgForm){
    this.authService.login(
        {
          email:loginForm.controls['email-address'].value,
          password: loginForm.controls['password'].value
        }
      )
  }
}
