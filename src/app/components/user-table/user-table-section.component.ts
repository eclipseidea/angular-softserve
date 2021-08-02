import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ModalService} from "../../service/modal/modal.service";
import {User} from "../../model/user";
import {Subscription, throwError} from "rxjs";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table-section.component.html',
  styleUrls: ['./user-table-section.component.css'],
})
export class UserTableSectionComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  // отримані дані з сервера
  users: User[] = [];

  //змінна для фільтра
  query = '';

  //показуем кількість елементів на сторінці
  viewQuantityElements: number = 21;


  constructor(private userService: UserService,
              private modalService: ModalService) {
  }


  ngOnInit() {
    this.userService.getUsersData(this.viewQuantityElements);
    this.subscription = this.userService.usersSubscription.subscribe(data => {
      this.users = data;
      if (this.users.length < this.viewQuantityElements) {
        this.userService.getUsersData(this.viewQuantityElements);
      }
    })
  }

  //міняємо значення модального вікна
  changeModalValue() {
    this.modalService.changeModalValue(true, "create")
      .catch(err => throwError(err));
  }

  //прокручуємо до кінця контейнера,даємо запит на сервер за додатковими юзерами
  @HostListener("window:scroll", ["$event"]) onWindowScroll(e: any): void {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      setTimeout(() => {
        this.userService.getUsersData(this.viewQuantityElements += 5);
      }, 2000);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
