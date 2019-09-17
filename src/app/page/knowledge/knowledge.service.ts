import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import { Observable } from 'rxjs';
import { Knowledge } from '../../common/dto/knowledge.model';
import Api from '../../common/utils/api';
import Utils from '../../common/utils/utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getKnowledge(params): Observable<Pagination<Knowledge[]>> {
    return this.http
      .get<Pagination<Knowledge[]>>(
        Api.knowledge.base,
        Object.assign({}, Utils.httpOptions, { params }),
      )
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.knowledge.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
