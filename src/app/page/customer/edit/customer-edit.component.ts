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
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
import { CITIES } from '../../../common/table/cities';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface City {
  code: string;
  name: string;
}

export interface User {
  name: string;
}

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
      type: CustomerType.NORMAL,
      level: CustomerLevel.LEVEL_1,
      gender: CustomerGender.UN_KNOW,
      birthday: '',
      occupation: ['', [Validators.minLength(0), Validators.maxLength(64)]],
      annualIncome: [null, [Validators.min(0), Validators.max(2147483647)]],
      education: CustomerEducation.UN_KNOW,
      maritalStatus: CustomerEducation.UN_KNOW,
      numberOfChildren: [null, [Validators.min(0), Validators.max(127)]],
      phoneNumber: ['', [Validators.minLength(0), Validators.maxLength(64)]],
      weChat: ['', [Validators.minLength(0), Validators.maxLength(64)]],
      qq: ['', [Validators.minLength(0), Validators.maxLength(64)]],
      email: ['', [Validators.minLength(0), Validators.maxLength(512)]],
    });
  }

  customerTypeTable = customerTypeTable;
  customerLevelTable = customerLevelTable;
  customerGenderTable = customerGenderTable;
  customerEducationTable = customerEducationTable;
  customerMaritalStatusTable = customerMaritalStatusTable;
  citiesTable = citiesTable;
  CITIES: City[] = CITIES;
  filteredCities: Observable<City[]>;

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

  get gender() {
    return this.editForm.get('gender');
  }

  get birthday() {
    return this.editForm.get('birthday');
  }

  get occupation() {
    return this.editForm.get('occupation');
  }

  get annualIncome() {
    return this.editForm.get('annualIncome');
  }

  get education() {
    return this.editForm.get('education');
  }

  get maritalStatus() {
    return this.editForm.get('maritalStatus');
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

  city = new FormControl();

  ngOnInit() {
    this.filteredCities = this.city.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._cityFilter(name) : this.CITIES.slice())),
    );

    this.isEdit = this.data.type === 'EDIT';
    if (this.isEdit) {
      this.getCustomer(this.data.customer.uuid);
    }
  }

  cityDisplay(city?: City): string | undefined {
    return city ? city.name : undefined;
  }

  private _cityFilter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.CITIES.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0,
    );
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
      this.gender.setValue(res.gender);
      this.birthday.setValue(res.birthday);
      this.city.setValue(this.citiesTable[res.city]);
      this.occupation.setValue(res.occupation);
      this.annualIncome.setValue(res.annualIncome);
      this.education.setValue(res.education);
      this.maritalStatus.setValue(res.maritalStatus);
      this.numberOfChildren.setValue(res.numberOfChildren);
      this.phoneNumber.setValue(res.phoneNumber);
      this.weChat.setValue(res.weChat);
      this.qq.setValue(res.qq);
      this.email.setValue(res.email);
    });
  }

  onSubmit(data: Customer) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }

    const customer = this.data.customer;

    data.city = this.city.value.code;

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
    this.nickName.setValue('');
    this.realName.setValue('');
    this.type.setValue(CustomerType.NORMAL);
    this.level.setValue(CustomerLevel.LEVEL_1);
    this.gender.setValue(CustomerGender.UN_KNOW);
    this.birthday.setValue('');
    this.city.setValue({});
  }
}
