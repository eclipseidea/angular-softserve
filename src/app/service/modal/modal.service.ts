import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ModalValue} from "../../model/modalValue";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  modalSubject = new Subject<ModalValue>();

  // міняємо значення modalValue в ModalComponent яке встановлюється кліками
  // по кнопках update чи create в сестринських компонетах
  changeModalValue(modalOpen:any , modalFlag:any) {
    return new Promise(()=>{
      const modalValue = {modalOpen,modalFlag}
      this.modalSubject.next(modalValue);
    })
  }

}
