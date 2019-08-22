import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../utils/api';
import Utils from '../utils/utils';
import { Permission } from '../dto/permission.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getPermissions(): Observable<Permission[]> {
    return this.http
      .get<Permission[]>(Api.permission.base, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
