import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../utils/api';
import Utils from '../../utils/utils';
import { HttpError } from '../dto/http-error';
import { User } from '../dto/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User | HttpError> {
    return this.http
      .post<User>(Api.user.create, user, Utils.httpOptions)
      .pipe(catchError(Utils.handleError()));
  }

  loginUser(user: User): Observable<User | HttpError> {
    return this.http
      .post<User>(Api.user.login, user, Utils.httpOptions)
      .pipe(catchError(Utils.handleError()));
  }
}
