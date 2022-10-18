import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth/auth-service';
import {Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  isLoadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingSubject.subscribe(loading => {
      this.isLoading = loading;
    })
  }

  onSubmit(loginForm: NgForm){
    console.log("form is: " + loginForm)
    console.log("Mail is: " + loginForm.controls['email-address'].value)
    this.authService.login(
        {
          email:loginForm.controls['email-address'].value,
          password: loginForm.controls['password'].value
        }
      )
    console.log(loginForm);
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription){
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
