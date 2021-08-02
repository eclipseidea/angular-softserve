import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy, OnInit {

  public subscription: Subscription = new Subscription();

  public user: User;

  constructor(private userService: UserService) {
    this.user = {Id: null, FirstName: '', LastName: '', Email: '', Password: ''}
  }

  ngOnInit(): void {
    this.subscription = this.userService.userModelForRouter.subscribe(data => {
      this.user = data;
    })
  }

  ngOnDestroy() {
    this.user = {Id: null, FirstName: '', LastName: '', Email: '', Password: ''}
    this.subscription.unsubscribe();
  }
}
