import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import { Observable } from 'rxjs';
import Complaint from '../../common/model/complaint.model';
import Api from '../../common/utils/api';
import Utils from '../../common/utils/utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getComplaints(params: {
    limit: number;
    page: number;
  }): Observable<Pagination<Complaint[]>> {
    return this.http
      .get<Pagination<Complaint[]>>(
        Api.complaint.base,
        Object.assign({}, Utils.httpOptions, { params }),
      )
      .pipe(catchError(this.errorService.handleError()));
  }

  create(complaint) {
    return this.http
      .post(Api.complaint.base, complaint, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  update(uuid, complaint) {
    return this.http
      .patch(Api.complaint.update(uuid), complaint, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  assign(uuid, user) {
    return this.http
      .patch(Api.complaint.assign(uuid), { assignee: user }, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  finish(uuid, user) {
    return this.http
      .patch(Api.complaint.finish(uuid), { assignee: user }, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.complaint.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getComplaint(uuid): Observable<Complaint> {
    return this.http
      .get(Api.complaint.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
