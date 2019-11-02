import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Statistics from '../../common/model/statistics.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import Api from '../../common/utils/api';
import Utils from '../../common/utils/utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getAll(): Observable<Statistics> {
    return this.http
      .get<Statistics>(Api.statistics.base, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
