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
} from '../../../common/model/customer.model';
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
import { City } from '../../../common/class/city';

export interface User {
  name: string;
}

const emptyCustomerData = {
  name: null,
  nickName: null,
  realName: null,
  type: CustomerType.NORMAL,
  level: CustomerLevel.LEVEL_1,
  gender: CustomerGender.UN_KNOW,
  birthday: null,
  city: {},
  occupation: null,
  annualIncome: null,
  education: CustomerEducation.UN_KNOW,
  maritalStatus: CustomerMaritalStatus.UN_KNOW,
  numberOfChildren: null,
  phoneNumber: null,
  weChat: null,
  qq: null,
  email: null,
};

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
      realName: [null, [Validators.minLength(2), Validators.maxLength(64)]],
      type: CustomerType.NORMAL,
      level: CustomerLevel.LEVEL_1,
      gender: CustomerGender.UN_KNOW,
      birthday: null,
      occupation: [null, [Validators.minLength(0), Validators.maxLength(64)]],
      annualIncome: [null, [Validators.min(0), Validators.max(2147483647)]],
      education: CustomerEducation.UN_KNOW,
      maritalStatus: CustomerEducation.UN_KNOW,
      numberOfChildren: [null, [Validators.min(0), Validators.max(127)]],
      phoneNumber: [null, [Validators.minLength(0), Validators.maxLength(64)]],
      weChat: [null, [Validators.minLength(0), Validators.maxLength(64)]],
      qq: [null, [Validators.minLength(0), Validators.maxLength(64)]],
      email: [
        null,
        [Validators.minLength(0), Validators.maxLength(512), Validators.email],
      ],
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
  cityTimer?: number = null;

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
      map(value => (typeof value === 'string' ? value : value && value.name)),
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

    return this.CITIES.filter(city => {
      const cityName = city.name.toLowerCase();
      const pinyin = city.pinyin.toLowerCase();
      const pinyinFirstLetter = city.pinyinFirstLetter.toLowerCase();
      return (
        cityName.indexOf(filterValue) === 0 ||
        pinyin.indexOf(filterValue) === 0 ||
        pinyinFirstLetter.indexOf(filterValue) === 0
      );
    });
  }

  private findCity(cityName: string): City {
    const foundCityName = this.CITIES.find(city => {
      return city.name === cityName;
    });
    const foundCityShortName = this.CITIES.find(city => {
      return cityName.indexOf(city.shortName) === 0;
    });
    return foundCityName || foundCityShortName;
  }

  getCustomer(uuid) {
    this.service.getCustomer(uuid).subscribe(res => {
      this.customerDefaultValue = res;

      this.customer = res;
      this.setCustomer(res);
    });
  }

  getCustomerJSON(data) {
    const json: Customer = {};

    json.name = data.name;
    json.nickName = data.nickName;
    json.realName = data.realName || null;
    json.type = data.type;
    json.level = data.level;
    json.gender = data.gender;
    json.birthday = data.birthday || null;

    if (this.city.value) {
      json.city = this.city.value.code || null;
    } else {
      json.city = null;
    }

    json.occupation = data.occupation || null;
    json.annualIncome = data.annualIncome;
    json.education = data.education;
    json.maritalStatus = data.maritalStatus;
    json.numberOfChildren = data.numberOfChildren;
    json.phoneNumber = data.phoneNumber || null;
    json.weChat = data.weChat || null;
    json.qq = data.qq || null;
    json.email = data.email || null;
    return json;
  }

  setCustomer(data) {
    this.name.setValue(data.name);
    this.nickName.setValue(data.nickName);
    this.realName.setValue(data.realName);
    this.type.setValue(data.type);
    this.level.setValue(data.level);
    this.gender.setValue(data.gender);
    this.birthday.setValue(data.birthday);

    if (data.city) {
      this.city.setValue(this.citiesTable[data.city]);
    } else {
      this.city.setValue({});
    }

    this.occupation.setValue(data.occupation);
    this.annualIncome.setValue(data.annualIncome);
    this.education.setValue(data.education);
    this.maritalStatus.setValue(data.maritalStatus);
    this.numberOfChildren.setValue(data.numberOfChildren);
    this.phoneNumber.setValue(data.phoneNumber);
    this.weChat.setValue(data.weChat);
    this.qq.setValue(data.qq);
    this.email.setValue(data.email);
  }

  onSubmit(data: Customer) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }

    const customer = this.data.customer;

    const json = this.getCustomerJSON(data);

    this.saveLoading = true;
    if (this.isEdit) {
      this.saveEdit(customer, json);
    } else {
      json.registrationTime = new Date().toJSON();
      this.saveNew(json);
    }
  }

  resetEdit() {
    this.setCustomer(this.customerDefaultValue);
  }

  resetNew() {
    this.setCustomer(emptyCustomerData);
  }

  handleCityClosed() {
    clearTimeout(this.cityTimer);
    this.cityTimer = setTimeout(() => {
      const cityName = this.city.value;
      if (typeof cityName !== 'string') {
        return;
      }

      const foundCity = this.findCity(cityName);
      if (foundCity) {
        this.city.setValue(foundCity);
        return;
      }

      this.city.setValue({});
    }, 100);
  }
}
