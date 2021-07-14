import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ModalService} from "../../service/modal/modal.service";

@Component({
  selector: 'app-my-tr',
  templateUrl: './user-table-row.component.html',
  styleUrls: ['./user-table-row.component.css']
})
export class UserTableRowComponent {
  @Input() user: any;

  constructor(private userService: UserService,
              private modalService:ModalService ) {}

  deleteUser(id: number) {
    this.userService.removeUser(id).subscribe();
  }

  createEditingModel() {
    this.userService.getUserById(this.user.Id).subscribe(data=>{
      this.userService.createUserModel(data).then();
    });

    this.modalService.changeModalValue(true,"update").then();
  }

  ngOnInit(): void {

  }
}
