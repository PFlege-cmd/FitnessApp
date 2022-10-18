import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth-service';
import {Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{

  maxDate!: Date;
  isLoading: boolean;
  isLoadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getFullYear() - 18);
    this.isLoadingSubscription = this.uiService.loadingSubject.subscribe(loading => {
      this.isLoading = loading;
    })
  }

  onSubmit(form: NgForm){
    this.authService.registerUser( {
      email: form.value.email,
      password: form.value.password
    });
    console.log(form);
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription){
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
