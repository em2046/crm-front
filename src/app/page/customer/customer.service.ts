import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../common/service/error.service';
import { Observable } from 'rxjs';
import { Customer } from '../../common/dto/customer.model';
import Api from '../../common/utils/api';
import Utils from '../../common/utils/utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getCustomers(params): Observable<Pagination<Customer[]>> {
    return this.http
      .get<Pagination<Customer[]>>(
        Api.customer.base,
        Object.assign({}, Utils.httpOptions, { params }),
      )
      .pipe(catchError(this.errorService.handleError()));
  }

  remove(uuid: string) {
    return this.http
      .delete(Api.customer.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  create(customer) {
    return this.http
      .post(Api.customer.base, customer, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  update(uuid, customer) {
    return this.http
      .patch(Api.customer.uuid(uuid), customer, Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }

  getCustomer(uuid: string): Observable<Customer> {
    return this.http
      .get<Customer>(Api.customer.uuid(uuid), Utils.httpOptions)
      .pipe(catchError(this.errorService.handleError()));
  }
}
