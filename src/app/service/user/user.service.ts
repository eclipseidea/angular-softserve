import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {User} from "../../model/user";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // створюемо Subject для активноі моделі юзера
  public user = new Subject<User>();

  constructor(private http: HttpClient ) {}

  // повертає всіх юзерів у компонент
  getData(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users/")
      .pipe(
         map(res => res),
         catchError(this.handleError)
      );

  }

  // додаємо новий обєкт юзера в масив
  addUser(user: User):Observable<User> {
    const options = {'content-Type': 'application/json'};
    return this.http.post<User>('http://localhost:3000/addUser/',JSON.stringify(user),{headers: options})
      .pipe(
        catchError(this.handleError)
      );
  }

  //видаляєм обєкт з бази
  removeUser(id: number) :Observable<User> {
    return this.http.delete<User>(`http://localhost:3000/deleteUser/${JSON.stringify(id)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //створюємо модель обєкта для редагування
  getUserById(id:number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/getUser/${JSON.stringify(id)}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  //обновляємо обєкт юзера
  updateUser(id: number,value:any) : Observable<User> {
    return this.http.put<User>(`http://localhost:3000/updateUser/${JSON.stringify(id)}`,value)
      .pipe(
        catchError(this.handleError)
      );
  }


  createUserModel(data:any) {
    return new Promise(() => {
      this.user.next(data[0]);
    });
  }

  handleError(res:HttpErrorResponse){
    return throwError(res.error);
  }

}
