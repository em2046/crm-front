import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../utils/api';
import Utils from '../../utils/utils';
import { HttpResult } from '../dto/http-result';
import { User } from '../dto/user.model';

export enum UserCreateCode {
  SUCCESS = 0,
  NAME_ALREADY_EXISTS = 1,
  EMAIL_ALREADY_EXISTS = 2,
}

export enum UserLoginCode {
  SUCCESS = 0,
  NAME_OR_PASSWORD_INCORRECT = 1,
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<HttpResult<UserCreateCode, User>> {
    return this.http
      .post<HttpResult<UserCreateCode, User>>(
        Api.user.create,
        user,
        Utils.httpOptions,
      )
      .pipe(catchError(Utils.handleError));
  }

  loginUser(user: User): Observable<HttpResult<UserLoginCode, User>> {
    return this.http
      .post<HttpResult<UserLoginCode, User>>(
        Api.user.login,
        user,
        Utils.httpOptions,
      )
      .pipe(catchError(Utils.handleError));
  }
}
