import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user.component";
import {RouterModule, Routes} from "@angular/router";
import {AboutUsComponent} from "../about-us/about-us.component";

const route :Routes = [{
  path:``,component : UserComponent,
}]

@NgModule({
  declarations: [UserComponent],
  exports:[UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class UserModule { }
