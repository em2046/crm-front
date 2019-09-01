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
}
