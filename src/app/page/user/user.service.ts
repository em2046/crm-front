import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../../utils/api';
import Utils from '../../../utils/utils';
import { User } from '../../dto/user.model';
import { ErrorService } from '../../common/error.service';

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
}
