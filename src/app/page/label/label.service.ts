import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from '../../common/model/label.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import Utils from '../../common/utils/utils';
import Api from '../../common/utils/api';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getLabels(): Observable<Label[]> {
    return this.http
      .get<Label[]>(Api.label.base, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getLabel(uuid: string): Observable<Label> {
    return this.http
      .get<Label>(Api.label.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  create(label) {
    return this.http
      .post<Label>(Api.label.base, label, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  update(uuid, label): Observable<Label> {
    return this.http
      .patch<Label>(Api.label.uuid(uuid), label, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
