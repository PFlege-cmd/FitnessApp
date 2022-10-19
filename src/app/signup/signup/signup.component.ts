import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'src/app/auth/auth/auth-service';
import {Observable, Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";
import * as fromRoot from '../../app.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{

  maxDate!: Date;
  isLoading$: Observable<boolean>;
  isLoadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(form: NgForm){
    this.authService.registerUser( {
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    // if (this.isLoadingSubscription){
    //   this.isLoadingSubscription.unsubscribe();
    // }
  }
}
