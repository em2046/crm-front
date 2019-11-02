import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEdit } from '../../common/page-edit';
import Sale from '../../../common/model/sale.model';
import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../components/chips-autocomplete/chips-autocomplete.component';
import { taskStatusTable } from 'src/app/common/table/task.table';
import { UserService } from '../../../common/service/user.service';
import { SaleService } from '../sale.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import { LabelService } from '../../label/label.service';

@Component({
  selector: 'app-sale-edit',
  templateUrl: './sale-edit.component.html',
  styleUrls: ['../../common/edit.less', './sale-edit.component.less'],
})
export class SaleEditComponent extends PageEdit<Sale> implements OnInit {
  constructor(
    public userService: UserService,
    public labelService: LabelService,
    public service: SaleService,
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

  @ViewChild('chipsAuto', { static: false })
  chipsAuto: ChipsAutocompleteComponent;

  @ViewChild('chipsAutoLabel', { static: false })
  chipsAutoLabel: ChipsAutocompleteComponent;

  taskStatusTable = taskStatusTable;

  data: {
    type: string;
    sale: Sale;
  };
  sale: Sale = { title: '', description: '' };
  saleDefaultValue: Sale = {
    title: '',
    description: '',
  };

  selectedUsers: Option[] = [];
  allUsers: Option[] = [];

  selectedLabels: Option[] = [];
  allLabels: Option[] = [];

  ngOnInit() {
    this.isEdit = this.data.type === 'EDIT';

    if (this.isEdit) {
      this.getSale(this.data.sale.uuid);
    } else {
      this.getUsers();
      this.getLabels();
    }
  }

  get title() {
    return this.editForm.get('title');
  }

  get description() {
    return this.editForm.get('description');
  }

  onSubmit(data: Sale) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }

    const sale = this.data.sale;

    if (this.isEdit) {
      this.saveLoading = true;
      this.saveEdit(sale, data);
    } else {
      if (!this.selectedUsers[0]) {
        this.alertService.alert('请选择指派');
        return;
      }
      if (!this.selectedLabels[0]) {
        this.alertService.alert('请选择标签');
        return;
      }

      data.assignee = {
        uuid: this.selectedUsers[0].value,
      };
      data.label = {
        uuid: this.selectedLabels[0].value,
      };
      this.saveLoading = true;
      this.saveNew(data);
    }
  }

  resetEdit() {
    this.title.setValue(this.saleDefaultValue.title);
    this.description.setValue(this.saleDefaultValue.description);
  }

  resetNew() {
    this.title.setValue('');
    this.description.setValue('');
  }

  private getSale(uuid) {
    this.service.getSale(uuid).subscribe(res => {
      this.saleDefaultValue = res;

      this.sale = res;
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

  private getLabels() {
    this.labelService.getLabels().subscribe(res => {
      this.allLabels = res.map(r => {
        return {
          value: r.uuid,
          title: r.title,
        };
      });
      this.chipsAutoLabel.refreshFilter();
    });
  }
}
