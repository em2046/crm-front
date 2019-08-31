import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../utils/api';
import Utils from '../utils/utils';
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

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(Api.user.base, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getOne(uuid): Observable<User> {
    return this.http
      .get<User>(Api.user.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  update(uuid, user): Observable<User> {
    return this.http
      .patch<User>(Api.user.uuid(uuid), user, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getByToken() {
    return this.http
      .get<User>(Api.auth.me, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.user.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  create(user) {
    return this.http
      .post<User>(Api.user.base, user, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
