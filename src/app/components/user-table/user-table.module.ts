import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserTableSectionComponent} from "./user-table-section.component";
import {UserTableRowComponent} from "../../fragments/user-table-row/user-table-row.component";
import {FormsModule} from "@angular/forms";
import {SearchFilterPipe} from "../../service/search-filter.pipe";
import { RouterModule, Routes} from "@angular/router";

const route :Routes = [{
  path:"",component:UserTableSectionComponent,
}]

@NgModule({
  declarations: [
    UserTableSectionComponent,
    UserTableRowComponent,
    SearchFilterPipe
  ],

  exports:[
    UserTableSectionComponent,
    UserTableRowComponent,
    SearchFilterPipe
  ],

  providers:[],
  imports: [
    RouterModule.forChild(route),
    FormsModule,
    CommonModule,
  ]
})
export class UserTableModule { }
