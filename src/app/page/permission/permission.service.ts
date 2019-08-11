import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../../utils/api';
import Utils from '../../../utils/utils';
import { Permission } from '../../dto/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  getPermissions(handleError): Observable<Permission[]> {
    return this.http
      .get<Permission[]>(Api.permission.findAll, Utils.httpOptions)
      .pipe(catchError(Utils.handleError(handleError)));
  }
}
