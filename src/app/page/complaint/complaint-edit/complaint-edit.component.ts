import { Component, OnInit } from '@angular/core';
import { PageEdit } from '../../common/page-edit';
import Complaint from '../../../common/dto/complaint.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import { ComplaintService } from '../complaint.service';
import { taskStatusTable } from 'src/app/common/table/task.table';

@Component({
  selector: 'app-complaint-edit',
  templateUrl: './complaint-edit.component.html',
  styleUrls: ['../../common/edit.less', './complaint-edit.component.less'],
})
export class ComplaintEditComponent extends PageEdit<Complaint>
  implements OnInit {
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

  constructor(
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
}
