import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {modal_token} from "../../service/injectable/modal-config/modal-constants";
import {ModalWindowSettings} from "../../model/modalWindowSettings";
import {ModalService} from "../../service/modal/modal.service";
import {ModalValue} from "../../model/modalValue";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Validator} from "../../service/form-validators/validator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent implements OnInit, OnDestroy {

  // константа яку ми інжектимо для модального вікна
  modalSettings: ModalWindowSettings;

  //значення та цільове призначення модального вікна
  modalValue: ModalValue;

  //id юзера якого редагуємо
  userID: number;

  //профіль форми яку використовуемо для додавання юзерів
  profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(18),
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validator.cannotContainSpace,
      Validators.maxLength(20)
    ]),
  });


  // в конструкторі ми задаємо нжектимо константу дефолтним значенням,
  // а також задаємо дефолтне значення активному юзеру при ініціалізаціі
  constructor(private userService: UserService,
              private modalService: ModalService,
              @Inject(modal_token)
              private config: { [name: string]: ModalWindowSettings }) {

    // дефолтне значення константи
    this.modalSettings = this.config.default;

    // дефолтне значення модального вікна
    this.modalValue = {modalOpen: false, modalFlag: ""};

    //ініціалізуємо id по дефолту
    this.userID = 0;
  }


  ngOnInit() {
    //витягуємо з сервіса активну модель юзера по підписці та передаємо в форму для редагування
    // та включаємо режим редагування нашій константі
    this.userService.userModelForEditForm.subscribe((user: any) => {
      this.userID = user.Id;
      this.modalSettings = this.config.update;
      this.profileForm.controls["firstName"].setValue(user.FirstName);
      this.profileForm.controls["lastName"].setValue(user.LastName);
      this.profileForm.controls["email"].setValue(user.Email);
      this.profileForm.controls["password"].setValue(user.Password);
    });

    //в іншому випадку включаємо нашій константі режим створення юзера
    this.modalService.modalSubject.subscribe((obj) => {
      this.modalValue = obj;
      if (this.modalValue.modalOpen && this.modalValue.modalFlag === 'create') {
        this.modalSettings = this.config.create;
      }
    });
  }

  /*
  * дана функція використовується як form submit
  * в залежності від діі : редагування або додавання юзера
  * якщо modalValue.modalFlag === 'create' то при submit form ми редагуємо
  * існуючу модель юзера в іншому випадку додаєм юзера
  */
  submit() {
    if (this.modalValue.modalFlag === 'create') {
      this.userService.addUser(this.profileForm.value);

    } else if (this.modalValue.modalFlag === 'update') {
      this.userService.updateUser(this.userID, this.profileForm.value);
    }
    this.resetUser();
  }

  //обнуляемо модель активного юзера ресетимо форму
  resetUser() {
    this.userID = 0;
    this.profileForm.reset();
  }

  ngOnDestroy(): void {
    this.userService.userModelForEditForm.unsubscribe();
    this.modalService.modalSubject.unsubscribe();
  }
}
