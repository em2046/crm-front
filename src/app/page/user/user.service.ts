import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../../utils/api';
import Utils from '../../../utils/utils';
import { User } from '../../dto/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(handleError): Observable<User[]> {
    return this.http
      .get<User[]>(Api.user.findAll, Utils.httpOptions)
      .pipe(catchError(Utils.handleError(handleError)));
  }
}
