import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Api from '../utils/api';
import Utils from '../utils/utils';
import { Role } from '../model/role.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  /**
   * 获取全部角色
   */
  getAll(): Observable<Role[]> {
    return this.http
      .get<Role[]>(Api.role.base, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  /**
   * 获取角色
   * @param uuid 编号
   */
  getOne(uuid: string): Observable<Role> {
    return this.http
      .get<Role>(Api.role.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  /**
   * 获取全部角色并附带权限
   */
  getAllJoinPermissions(): Observable<Role[]> {
    return this.http
      .get<Role[]>(Api.role.joinPermissions, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  /**
   * 获取角色并附带权限
   * @param uuid 编号
   */
  getJoinPermissions(uuid: string): Observable<Role> {
    return this.http
      .get<Role>(Api.role.uuidJoinPermissions(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.role.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  create(role) {
    return this.http
      .post<Role>(Api.role.base, role, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  update(uuid, role): Observable<Role> {
    return this.http
      .patch<Role>(Api.role.uuid(uuid), role, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
