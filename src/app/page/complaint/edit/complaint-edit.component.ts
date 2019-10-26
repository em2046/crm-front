import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEdit } from '../../common/page-edit';
import Complaint from '../../../common/dto/complaint.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import { ComplaintService } from '../complaint.service';
import { taskStatusTable } from 'src/app/common/table/task.table';
import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../components/chips-autocomplete/chips-autocomplete.component';
import { UserService } from '../../../common/service/user.service';
import { User } from '../../../common/dto/user.model';

@Component({
  selector: 'app-complaint-edit',
  templateUrl: './complaint-edit.component.html',
  styleUrls: ['../../common/edit.less', './complaint-edit.component.less'],
})
export class ComplaintEditComponent extends PageEdit<Complaint>
  implements OnInit {
  @ViewChild('chipsAuto', { static: false })
  chipsAuto: ChipsAutocompleteComponent;
  taskStatusTable = taskStatusTable;

  data: {
    type: string;
    complaint: Complaint;
  };
  complaint: Complaint = { title: '', description: '' };
  complaintDefaultValue: Complaint = {
    title: '',
    description: '',
  };

  selectedUsers: Option[] = [];
  allUsers: Option[] = [];

  constructor(
    public userService: UserService,
    public service: ComplaintService,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
  ) {
    super();
    this.editForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
      description: [''],
    });
  }

  get title() {
    return this.editForm.get('title');
  }

  get description() {
    return this.editForm.get('description');
  }

  ngOnInit() {
    this.isEdit = this.data.type === 'EDIT';

    if (this.isEdit) {
      this.getComplaint(this.data.complaint.uuid);
    } else {
      this.getUsers();
    }
  }

  onSubmit(data: Complaint) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }

    const complaint = this.data.complaint;
    this.saveLoading = true;
    if (this.isEdit) {
      this.saveEdit(complaint, data);
    } else {
      data.assignee = {
        uuid: this.selectedUsers[0].value,
      };
      this.saveNew(data);
    }
  }

  resetEdit() {
    this.title.setValue(this.complaintDefaultValue.title);
    this.description.setValue(this.complaintDefaultValue.description);
  }

  resetNew() {
    this.title.setValue('');
    this.description.setValue('');
  }

  private getComplaint(uuid) {
    this.service.getComplaint(uuid).subscribe(res => {
      this.complaintDefaultValue = res;

      this.complaint = res;
      this.title.setValue(res.title);
      this.description.setValue(res.description);
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
