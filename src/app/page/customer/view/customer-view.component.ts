import { Component, OnInit } from '@angular/core';
import { PageData } from '../../../common/class/page-data';
import { Customer } from '../../../common/model/customer.model';
import { CustomerService } from '../customer.service';
import {
  customerTypeTable,
  customerGenderTable,
  customerLevelTable,
  customerMaritalStatusTable,
  customerEducationTable,
} from 'src/app/common/table/customer.table';
import { citiesTable } from 'src/app/common/table/cities.table';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.less'],
})
export class CustomerViewComponent implements OnInit, PageData {
  constructor(public service: CustomerService) {}

  data: {
    type: string;
    customer: Customer;
  };
  customer: Customer = {};

  customerTypeTable = customerTypeTable;
  customerLevelTable = customerLevelTable;
  customerGenderTable = customerGenderTable;
  customerEducationTable = customerEducationTable;
  customerMaritalStatusTable = customerMaritalStatusTable;
  citiesTable = citiesTable;

  ngOnInit() {
    this.getCustomer(this.data.customer.uuid);
  }

  getCustomer(uuid) {
    this.service.getCustomer(uuid).subscribe(res => {
      this.customer = res;
    });
  }
}
