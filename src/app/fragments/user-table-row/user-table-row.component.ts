import {Component, Input, OnDestroy} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ModalService} from "../../service/modal/modal.service";
import {Subscription, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-tr',
  templateUrl: './user-table-row.component.html',
  styleUrls: ['./user-table-row.component.css']
})
export class UserTableRowComponent implements OnDestroy{
  @Input() user: any;

  subscription: Subscription;

  constructor(private userService: UserService,
              private modalService:ModalService,
              private router:Router) {
    this.subscription = new Subscription();
  }

  deleteUser(id: number) {
    this.userService.removeUser(id);
  }

  createEditingModel() {
    this.subscription = this.userService.getUserById(this.user.Id).subscribe(data=>{
      this.userService.createUserModel(data).catch(err=>throwError(err));
    });

    this.modalService.changeModalValue(true,"update").catch(err=>throwError(err));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  redirectToUser() {
    this.router.navigate([`/user/${this.user.Id}/`])
      .then(()=>{this.userService.createUserModelForRoutes(this.user)})
      .catch(err =>throwError(err));
  }
}
