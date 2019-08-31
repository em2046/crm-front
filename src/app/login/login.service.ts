import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../common/utils/api';
import Utils from '../common/utils/utils';
import { AccessToken } from '../common/class/access-token';
import { User } from '../common/dto/user.model';
import { ErrorService } from '../common/service/error.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(Api.user.base, user, Utils.httpOptionsWithoutAuth)
      .pipe(catchError(this.errorService.handleError()));
  }

  loginUser(user): Observable<AccessToken> {
    return this.http
      .post<AccessToken>(Api.auth.login, user, Utils.httpOptionsWithoutAuth)
      .pipe(catchError(this.errorService.handleError()));
  }
}
