import { Component, OnInit, ViewChild } from '@angular/core';
import Complaint from '../../../common/dto/complaint.model';
import { ComplaintService } from '../complaint.service';
import { finalize } from 'rxjs/operators';
import { taskStatusTable } from 'src/app/common/table/task.table';
import { TaskStatus } from '../../../common/dto/task.model';
import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../components/chips-autocomplete/chips-autocomplete.component';
import { UserService } from '../../../common/service/user.service';

@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.less'],
})
export class ComplaintViewComponent implements OnInit {
  constructor(
    public service: ComplaintService,
    public userService: UserService,
  ) {}

  @ViewChild('chipsAuto', { static: false })
  chipsAuto: ChipsAutocompleteComponent;

  selectedUsers: Option[] = [];
  allUsers: Option[] = [];

  TaskStatus = TaskStatus;
  taskStatusTable = taskStatusTable;
  data: {
    complaint: Complaint;
  };
  complaint: Complaint = { title: '', description: '' };

  handleAssign() {
    if (!this.selectedUsers.length) {
      return;
    }

    const user = this.selectedUsers[0].value;
    console.log(user);
  }

  handleFinish() {
    console.log(this.selectedUsers);
  }

  ngOnInit() {
    this.getComplaint(this.data.complaint.uuid);
    this.getUsers();
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
      this.allUsers = res.map(r => {
        return {
          value: r.uuid,
          title: r.realName,
        };
      });
      this.chipsAuto.refreshFilter();
    });
  }
}
