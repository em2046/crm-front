import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../utils/api';
import Utils from '../../utils/utils';
import { AccessToken } from '../dto/access-token';
import { User } from '../dto/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  addUser(user: User, handleError): Observable<User> {
    return this.http
      .post<User>(Api.user.create, user, Utils.httpOptions)
      .pipe(catchError(Utils.handleError(handleError)));
  }

  loginUser(user, handleError): Observable<AccessToken> {
    return this.http
      .post<AccessToken>(Api.user.login, user, Utils.httpOptions)
      .pipe(catchError(Utils.handleError(handleError)));
  }
}
