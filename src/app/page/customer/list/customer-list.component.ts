import { Component, OnInit } from '@angular/core';
import { PageList } from '../../common/page-list';
import { Customer } from '../../../common/dto/customer.model';
import { CustomerService } from '../customer.service';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import Utils from 'src/app/common/utils/utils';
import { Tab } from '../../../common/class/tab';
import { Page } from '../../../common/class/page';
import { UserEditComponent } from '../../user/edit/user-edit.component';
import { TabService } from '../../../framework/tab.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['../../common/list.less', './customer-list.component.less'],
})
export class CustomerListComponent extends PageList<Customer>
  implements OnInit {
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
  ];

  constructor(public service: CustomerService, public tabService: TabService) {
    super();
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.getLoading = true;
    this.service
      .getCustomers()
      .pipe(
        finalize(() => {
          this.getLoading = false;
        }),
      )
      .subscribe(res => {
        this.items = res;
        this.updateView();
      });
  }

  handleAdd() {
    this.tabService.mission(
      new Tab({
        title: '用户新增',
        name: 'user-add',
        page: new Page(UserEditComponent, {
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
