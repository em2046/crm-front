import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Sale from '../../common/model/sale.model';
import Api from '../../common/utils/api';
import Utils from '../../common/utils/utils';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import { SaleCustomer } from '../../common/model/sale-customer.model';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getSales(params: {
    limit: number;
    page: number;
  }): Observable<Pagination<Sale[]>> {
    return this.http
      .get<Pagination<Sale[]>>(
        Api.sale.base,
        Object.assign({}, Utils.httpOptions, { params }),
      )
      .pipe(catchError(this.errorService.handleError()));
  }

  create(sale) {
    return this.http
      .post(Api.sale.base, sale, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  update(uuid, sale) {
    return this.http
      .patch(Api.sale.update(uuid), sale, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  assign(uuid, user) {
    return this.http
      .patch(Api.sale.assign(uuid), { assignee: user }, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  finish(uuid, user) {
    return this.http
      .patch(Api.sale.finish(uuid), { assignee: user }, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.sale.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getSale(uuid): Observable<Sale> {
    return this.http
      .get(Api.sale.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  finishSub(uuid: string): Observable<SaleCustomer> {
    const body = {
      finished: true,
    };
    return this.http
      .patch(Api.saleCustomer.update(uuid), body, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
