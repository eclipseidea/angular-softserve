import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AboutUsComponent} from "./about-us.component";
import {RouterModule, Routes} from "@angular/router";

const route :Routes = [{
  path:"",component:AboutUsComponent,
}]

@NgModule({
  declarations: [AboutUsComponent],
  exports:[AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class AboutUsModule { }
