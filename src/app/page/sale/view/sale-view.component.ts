import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleService } from '../sale.service';
import { UserService } from '../../../common/service/user.service';
import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../components/chips-autocomplete/chips-autocomplete.component';
import Sale from '../../../common/model/sale.model';
import { finalize } from 'rxjs/operators';
import { taskStatusTable } from 'src/app/common/table/task.table';
import { TaskStatus } from 'src/app/common/model/task.model';
import { SaleCustomer } from '../../../common/model/sale-customer.model';
import { Customer } from '../../../common/model/customer.model';
import { Tab } from '../../../common/class/tab';
import { Page } from '../../../common/class/page';
import { CustomerViewComponent } from '../../customer/view/customer-view.component';
import { TabService } from '../../../framework/tab.service';
import { AlertService } from '../../../common/service/alert.service';

@Component({
  selector: 'app-sale-view',
  templateUrl: './sale-view.component.html',
  styleUrls: ['./sale-view.component.less'],
})
export class SaleViewComponent implements OnInit {
  constructor(
    public service: SaleService,
    public userService: UserService,
    public tabService: TabService,
    private readonly alertService: AlertService,
  ) {}

  @ViewChild('chipsAutoAssign', { static: false })
  chipsAutoAssign: ChipsAutocompleteComponent;

  selectedUsers: Option[] = [];
  allUsers: Option[] = [];
  allStaff: Option[] = [];

  TaskStatus = TaskStatus;
  taskStatusTable = taskStatusTable;
  data: {
    sale: Sale;
  };
  sale: Sale = { title: '', description: '' };
  finishProgress = 0;

  handleAssign() {
    if (!this.selectedUsers.length) {
      this.alertService.snack('请选择指派');
      return;
    }

    const user = this.selectedUsers[0].value;

    this.service.assign(this.sale.uuid, user).subscribe(() => {
      this.refresh();
    });
  }

  handleFinish() {
    this.service.finish(this.sale.uuid, this.sale.assignee).subscribe(() => {
      this.refresh();
    });
  }

  ngOnInit() {
    this.refresh();
    this.getUsers();
  }

  refresh() {
    this.getSale(this.data.sale.uuid);
  }

  private getSale(uuid: string) {
    this.service
      .getSale(uuid)
      .pipe(finalize(() => {}))
      .subscribe(res => {
        this.sale = res;
        this.updateFinishProgress();
      });
  }

  private getUsers() {
    this.userService.getAll().subscribe(res => {
      this.allStaff = res
        .filter(u => {
          return u.roles.find(r => {
            return r.name === 'staff';
          });
        })
        .map(r => {
          return {
            value: r.uuid,
            title: r.realName,
          };
        });

      this.allUsers = res.map(r => {
        return {
          value: r.uuid,
          title: r.realName,
        };
      });

      if (this.chipsAutoAssign) {
        this.chipsAutoAssign.refreshFilter();
      }
    });
  }

  handleFinishSub(saleCustomer: SaleCustomer) {
    this.service.finishSub(saleCustomer.uuid).subscribe(res => {
      saleCustomer.finished = res.finished;
      this.updateFinishProgress();
    });
  }

  updateFinishProgress() {
    const saleCustomers = this.sale.saleCustomers;
    const size = saleCustomers.length;
    let finishCount = 0;
    saleCustomers.forEach(saleCustomer => {
      if (saleCustomer.finished) {
        finishCount++;
      }
    });
    this.finishProgress = finishCount / size;
  }

  handleCustomerView(customer: Customer) {
    this.tabService.mission(
      new Tab({
        title: '客户查看',
        name: `customer-view#${customer.uuid}`,
        page: new Page(CustomerViewComponent, {
          type: 'VIEW',
          customer,
        }),
      }),
    );
  }
}
