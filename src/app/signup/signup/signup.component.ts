import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate!: Date;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm){
    this.authService.registerUser( {
      email: form.value.email,
      password: form.value.password
    });
    console.log(form);
  }
}
