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

  getKnowledgeList(params): Observable<Pagination<Knowledge[]>> {
    return this.http
      .get<Pagination<Knowledge[]>>(
        Api.knowledge.base,
        Object.assign({}, Utils.httpOptions, { params }),
      )
      .pipe(catchError(this.errorService.handleError()));
  }

  getKnowledge(uuid: string): Observable<Knowledge> {
    return this.http
      .get<Knowledge>(Api.knowledge.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.knowledge.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  create(knowledge) {
    return this.http
      .post(Api.knowledge.base, knowledge, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  update(uuid, knowledge) {
    return this.http
      .patch(Api.knowledge.uuid(uuid), knowledge, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  search(keyword: string) {
    return this.http
      .post(Api.knowledge.search, { keyword }, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
