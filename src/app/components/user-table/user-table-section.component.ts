import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ModalService} from "../../service/modal/modal.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table-section.component.html',
  styleUrls: ['./user-table-section.component.css']
})
export class UserTableSectionComponent implements OnInit, OnDestroy {

  users: User[] = [];
  query = '';


  constructor(private userService: UserService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.userService.getData().subscribe(data => {
      this.users = data;
      }
    )
  }

  ngOnDestroy(): void {
    this.userService.getData().subscribe().unsubscribe();
  }

  changeModalValue() {
    this.modalService.changeModalValue(true, "create").then();
  }
}
