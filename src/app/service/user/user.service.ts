import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject, throwError} from "rxjs";
import {User} from "../../model/user";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // створюемо Subject для активноі моделі юзера для форми редагування
  public userModelForEditForm = new Subject<User>();

  //створюемо ReplaySubject для активноі моделі юзера для роута з юзером
  public userModelForRouter = new ReplaySubject<User>();

  //створюємо підписку на список юзерів
  public usersSubscription = new Subject<User[]>();

  public userlist: User[] = [];

  user: User;

  constructor(private http: HttpClient) {
    this.user = {Id: null, FirstName: "", LastName: "", Email: "", Password: ""}
  }

  // повертає всіх юзерів у компонент
  getUsersData(par:number): Observable<User[]> | Promise<any> {
    return this.http.get<User[]>(`http://localhost:3000/users/${JSON.stringify(par)}`)
      .toPromise()
      .then((res) => {
        this.userlist = res;
        return this.usersSubscription.next(this.userlist);
      })
      .catch(err => throwError(err))
  }

  // додаємо новий обєкт юзера в масив
  addUser(value: any): Observable<User> | Promise<any> {
    return this.http.post<User>('http://localhost:3000/addUser/', JSON.stringify(value))
      .toPromise()
      .then()
      .catch(err => throwError(err));
  }

  //видаляєм обєкт з бази
  removeUser(id: number): Observable<User> | Promise<any> {
    return this.http.delete<User>(`http://localhost:3000/deleteUser/${JSON.stringify(id)}`)
      .toPromise()
      .then(() => {
        const removeIndex = this.userlist.map(function (item) {
          return item.Id;
        }).indexOf(id);
        this.userlist.splice(removeIndex, 1);
        return this.usersSubscription.next(this.userlist);
      })
      .catch(err => throwError(err))
  }

  //створюємо модель обєкта для редагування в формі
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/getUser/${JSON.stringify(id)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //обновляємо обєкт юзера
  updateUser(id: number, value: any): Observable<User> | Promise<any> {
    return this.http.put<User>(`http://localhost:3000/updateUser/${JSON.stringify(id)}`, value)
      .toPromise()
      .then(() => {
        const objIndex = this.userlist.findIndex((obj => obj.Id === id));
        this.userlist[objIndex].FirstName = value.firstName;
        this.userlist[objIndex].LastName = value.lastName;
        this.userlist[objIndex].Email = value.email
        this.userlist[objIndex].Password = value.password;
        return this.usersSubscription.next(this.userlist);
      })
      .catch(err => throwError(err))
  }

  createUserModel(data: any) {
    return new Promise(() => {
      this.userModelForEditForm.next(data[0]);
    });
  }

  createUserModelForRoutes(user:User) {
    this.user = user;
    this.userModelForRouter.next(this.user);
  }

  handleError(res: HttpErrorResponse) {
    return throwError(res.error);
  }

}
