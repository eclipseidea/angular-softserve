import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeaderComponent],
  exports:[HeaderComponent],
  imports: [
    RouterModule,
    CommonModule,
  ]
})
export class HeaderModule { }
