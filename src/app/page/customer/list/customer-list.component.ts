import { Component, OnInit, ViewChild } from '@angular/core';
import { PageList } from '../../common/page-list';
import { Customer } from '../../../common/dto/customer.model';
import { CustomerService } from '../customer.service';
import { finalize } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';
import Utils from 'src/app/common/utils/utils';
import { Tab } from '../../../common/class/tab';
import { Page } from '../../../common/class/page';
import { TabService } from '../../../framework/tab.service';
import {
  customerTypeTable,
  customerLevelTable,
  customerGenderTable,
  customerEducationTable,
  customerMaritalStatusTable,
} from 'src/app/common/table/customer.table';
import { citiesTable } from '../../../common/table/cities.table';
import { CustomerEditComponent } from '../edit/customer-edit.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['../../common/list.less', './customer-list.component.less'],
})
export class CustomerListComponent extends PageList<Customer>
  implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  getLoading = false;
  dataSource = new MatTableDataSource<Customer>([]);
  data: any;
  Utils = Utils;
  items: Customer[];
  displayedColumns: string[] = [
    'name',
    'nickName',
    'realName',
    'type',
    'level',
    'registrationTime',
    'gender',
    'birthday',
    'city',
    'occupation',
    'annualIncome',
    'education',
    'maritalStatus',
    'numberOfChildren',
    'phoneNumber',
    'weChat',
    'qq',
    'email',
    'operation',
  ];

  customerTypeTable = customerTypeTable;
  customerLevelTable = customerLevelTable;
  customerGenderTable = customerGenderTable;
  customerEducationTable = customerEducationTable;
  customerMaritalStatusTable = customerMaritalStatusTable;
  citiesTable = citiesTable;

  constructor(public service: CustomerService, public tabService: TabService) {
    super();
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.getLoading = true;
    this.service
      .getCustomers({
        page: this.pagination.pageIndex + 1,
        limit: this.pagination.pageSize,
      })
      .pipe(
        finalize(() => {
          this.getLoading = false;
        }),
      )
      .subscribe(res => {
        this.items = res.data;
        this.pagination.length = res.total;

        this.updateView();
      });
  }

  handleAdd() {
    this.tabService.mission(
      new Tab({
        title: '用户新增',
        name: 'user-add',
        page: new Page(CustomerEditComponent, {
          type: 'NEW',
          user: {},
        }),
      }),
    );
  }

  refreshPage() {
    this.ngOnInit();
  }
}
