import { Component, OnInit } from '@angular/core';
import { PageEdit } from '../../common/page-edit';
import { Label } from '../../../common/model/label.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['../../common/edit.less', './label-edit.component.less'],
})
export class LabelEditComponent extends PageEdit<Label> implements OnInit {
  constructor(
    public service: LabelService,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
  ) {
    super();
    this.editForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(64),
        ],
      ],
    });
  }

  get title() {
    return this.editForm.get('title');
  }

  ruleJson = {
    type: 'GROUP',
    operator: 'AND',
    children: [
      {
        type: 'RULE',
        rule: ['type', 'IN', []],
      },
    ],
  };

  private labelDefaultValue: Label = { title: '' };

  data: {
    type: string;
    label: Label;
  };
  label: Label = { title: '' };

  ngOnInit() {
    this.isEdit = this.data.type === 'EDIT';
    if (this.isEdit) {
      this.getLabel(this.data.label.uuid);
    }
  }

  onSubmit(data: Label) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }

    const label = this.data.label;
    const json: Label = {
      title: data.title,
      rule: this.ruleJson,
    };

    this.saveLoading = true;
    if (this.isEdit) {
      this.saveEdit(label, json);
    } else {
      this.saveNew(json);
    }
  }

  resetEdit() {}

  resetNew() {}

  private getLabel(uuid: string) {
    this.service.getLabel(uuid).subscribe(res => {
      this.labelDefaultValue = res;

      this.label = res;
      this.ruleJson = res.rule;
      this.title.setValue(res.title);
    });
  }
}
