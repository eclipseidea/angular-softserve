import {InjectionToken} from "@angular/core";
import {ModalWindowSettings} from "../../../model/modalWindowSettings";

export const modal_token = new InjectionToken<ModalWindowSettings>('');

export const modal_configure: { [name: string]: ModalWindowSettings } = {
  default:
    {
      title:"",
      button_title:""
    },
  create:
    {
      title: "Create new user",
      button_title: "Add",
    },
  update:
    {
      title: "Update user",
      button_title: "Update",
    }

}
