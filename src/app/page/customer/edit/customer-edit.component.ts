import { Component, OnInit } from '@angular/core';
import { PageEdit } from '../../common/page-edit';
import {
  Customer,
  CustomerType,
  customerTypeList,
  CustomerLevelList,
  CustomerGenderList,
  CustomerEducationList,
  CustomerMaritalStatusList,
  CustomerLevel,
  CustomerGender,
  CustomerEducation,
  CustomerMaritalStatus,
} from '../../../common/dto/customer.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import { CustomerService } from '../customer.service';
import {
  customerTypeTable,
  customerLevelTable,
  customerMaritalStatusTable,
  customerEducationTable,
  customerGenderTable,
} from 'src/app/common/table/customer.table';
import { citiesTable } from 'src/app/common/table/cities.table';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['../../common/edit.less', './customer-edit.component.less'],
})
export class CustomerEditComponent extends PageEdit<Customer>
  implements OnInit {
  constructor(
    public service: CustomerService,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
  ) {
    super();
    this.editForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
      nickName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(64),
        ],
      ],
      realName: ['', [Validators.minLength(0), Validators.maxLength(64)]],
      type: '',
      level: '',
      occupation: ['', [Validators.minLength(0), Validators.maxLength(64)]],
      annualIncome: [null, [Validators.min(0), Validators.max(2147483647)]],
      numberOfChildren: [null, [Validators.min(0), Validators.max(127)]],
      phoneNumber: [null, [Validators.minLength(0), Validators.maxLength(64)]],
      weChat: [null, [Validators.minLength(0), Validators.maxLength(64)]],
      qq: [null, [Validators.minLength(0), Validators.maxLength(64)]],
      email: [null, [Validators.minLength(0), Validators.maxLength(512)]],
    });
  }

  customerTypeTable = customerTypeTable;
  customerLevelTable = customerLevelTable;
  customerGenderTable = customerGenderTable;
  customerEducationTable = customerEducationTable;
  customerMaritalStatusTable = customerMaritalStatusTable;
  citiesTable = citiesTable;

  customerTypeList: CustomerType[] = customerTypeList;
  CustomerLevelList: CustomerLevel[] = CustomerLevelList;
  CustomerGenderList: CustomerGender[] = CustomerGenderList;
  CustomerEducationList: CustomerEducation[] = CustomerEducationList;
  CustomerMaritalStatusList: CustomerMaritalStatus[] = CustomerMaritalStatusList;

  get name() {
    return this.editForm.get('name');
  }

  get nickName() {
    return this.editForm.get('nickName');
  }

  get realName() {
    return this.editForm.get('realName');
  }

  get type() {
    return this.editForm.get('type');
  }

  get level() {
    return this.editForm.get('level');
  }

  get occupation() {
    return this.editForm.get('occupation');
  }

  get annualIncome() {
    return this.editForm.get('annualIncome');
  }

  get numberOfChildren() {
    return this.editForm.get('numberOfChildren');
  }

  get phoneNumber() {
    return this.editForm.get('phoneNumber');
  }

  get weChat() {
    return this.editForm.get('weChat');
  }

  get qq() {
    return this.editForm.get('qq');
  }

  get email() {
    return this.editForm.get('email');
  }

  private customerDefaultValue: Customer = {
    name: '',
    nickName: '',
  };

  data: {
    type: string;
    customer: Customer;
  };
  customer: Customer = { name: '' };

  ngOnInit() {
    this.isEdit = this.data.type === 'EDIT';
    if (this.isEdit) {
      this.getCustomer(this.data.customer.uuid);
    }
  }

  getCustomer(uuid) {
    this.service.getCustomer(uuid).subscribe(res => {
      this.customerDefaultValue = res;

      this.customer = res;
      this.name.setValue(res.name);
      this.nickName.setValue(res.nickName);
      this.realName.setValue(res.realName);
      this.type.setValue(res.type);
      this.level.setValue(res.level);
    });
  }

  onSubmit(data: Customer) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }

    const customer = this.data.customer;
    this.saveLoading = true;
    if (this.isEdit) {
      this.saveEdit(customer, data);
    } else {
      this.saveNew(data);
    }
  }

  resetEdit() {
    this.name.setValue(this.customerDefaultValue.name);
  }

  resetNew() {
    this.name.setValue('');
  }
}
