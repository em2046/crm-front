import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../../utils/api';
import Utils from '../../../utils/utils';
import { Role } from '../../dto/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(handleError): Observable<Role[]> {
    return this.http
      .get<Role[]>(Api.role.findAll, Utils.httpOptions)
      .pipe(catchError(Utils.handleError(handleError)));
  }
}
