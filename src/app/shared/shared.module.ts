import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialsModule} from "../materials.module";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class SharedModule{}
