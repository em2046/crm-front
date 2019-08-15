import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../../../utils/api';
import Utils from '../../../utils/utils';
import { Role } from '../../dto/role.model';
import { ErrorService } from '../../common/error.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getRoles(): Observable<Role[]> {
    return this.http
      .get<Role[]>(Api.role.base, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
