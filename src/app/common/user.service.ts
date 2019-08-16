import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../utils/api';
import Utils from '../../utils/utils';
import { User } from '../dto/user.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(Api.user.base, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getUser(uuid): Observable<User> {
    return this.http
      .get<User>(Api.user.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  updateUser(uuid, user): Observable<User> {
    return this.http
      .patch<User>(Api.user.uuid(uuid), user, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getUserByToken() {
    return this.http
      .get<User>(Api.auth.me, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.user.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
