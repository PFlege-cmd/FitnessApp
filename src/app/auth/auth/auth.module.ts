import {NgModule} from "@angular/core";
import {SignupComponent} from "../../signup/signup/signup.component";
import {LoginComponent} from "../../login/login/login.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialsModule} from "../../materials.module";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  exports: []
})
export class AuthModule{

}
