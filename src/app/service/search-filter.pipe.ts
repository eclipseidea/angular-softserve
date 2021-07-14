import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(users: any,  args?: any): any {
    if (!users) return null;
    if (!args) return users;

    args = args.toLowerCase();

    return users.filter(function (user: any) {
      return JSON.stringify(user).toLowerCase().includes(args);
    });
  }

}
