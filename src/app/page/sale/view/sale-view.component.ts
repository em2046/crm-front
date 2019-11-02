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

@Component({
  selector: 'app-sale-view',
  templateUrl: './sale-view.component.html',
  styleUrls: ['./sale-view.component.less'],
})
export class SaleViewComponent implements OnInit {
  constructor(public service: SaleService, public userService: UserService) {}

  @ViewChild('chipsAutoAssign', { static: false })
  chipsAutoAssign: ChipsAutocompleteComponent;

  selectedUsers: Option[] = [];
  allUsers: Option[] = [];

  TaskStatus = TaskStatus;
  taskStatusTable = taskStatusTable;
  data: {
    sale: Sale;
  };
  sale: Sale = { title: '', description: '' };

  handleAssign() {
    if (!this.selectedUsers.length) {
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
      });
  }

  private getUsers() {
    this.userService.getAll().subscribe(res => {
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
}
