import { Component, OnInit, ViewChild } from '@angular/core';
import Complaint from '../../../common/model/complaint.model';
import { ComplaintService } from '../complaint.service';
import { finalize } from 'rxjs/operators';
import { taskStatusTable } from 'src/app/common/table/task.table';
import { TaskStatus } from '../../../common/model/task.model';
import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../components/chips-autocomplete/chips-autocomplete.component';
import { UserService } from '../../../common/service/user.service';
import { AlertService } from '../../../common/service/alert.service';

@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.less'],
})
export class ComplaintViewComponent implements OnInit {
  constructor(
    public service: ComplaintService,
    public userService: UserService,
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
    complaint: Complaint;
  };
  complaint: Complaint = { title: '', description: '' };

  handleAssign() {
    if (!this.selectedUsers.length) {
      this.alertService.snack('请选择指派');
      return;
    }

    const user = this.selectedUsers[0].value;

    this.service.assign(this.complaint.uuid, user).subscribe(() => {
      this.refresh();
    });
  }

  handleFinish() {
    this.service
      .finish(this.complaint.uuid, this.complaint.assignee)
      .subscribe(() => {
        this.refresh();
      });
  }

  ngOnInit() {
    this.refresh();
    this.getUsers();
  }

  refresh() {
    this.getComplaint(this.data.complaint.uuid);
  }

  private getComplaint(uuid: string) {
    this.service
      .getComplaint(uuid)
      .pipe(finalize(() => {}))
      .subscribe(res => {
        this.complaint = res;
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
}
