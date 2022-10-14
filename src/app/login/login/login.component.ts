import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm){
    this.authService.registerUser(
        {
          email:loginForm.value.email,
          password: loginForm.value.password
        }
      )
    console.log(loginForm);
  }

}
