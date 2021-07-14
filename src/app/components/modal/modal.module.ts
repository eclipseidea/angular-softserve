import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {modal_configure, modal_token} from "../../service/injectable/modal-config/modal-constants";
import {ModalService} from "../../service/modal/modal.service";
import {UserService} from "../../service/user/user.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({

  declarations: [
    ModalComponent
  ],

  exports:[
    ModalComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  providers:[
    {provide: modal_token, useValue: modal_configure},
    UserService,
    ModalService
  ]
})
export class ModalModule { }
