import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import { Observable } from 'rxjs';
import Complaint from '../../common/dto/complaint.model';
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

  getComplaints(params): Observable<Pagination<Complaint[]>> {
    return this.http
      .get<Pagination<Complaint[]>>(
        Api.complaint.base,
        Object.assign({}, Utils.httpOptions, { params }),
      )
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.complaint.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
