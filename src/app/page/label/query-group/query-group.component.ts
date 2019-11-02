import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CustomerEducation,
  CustomerGender,
  CustomerMaritalStatus,
  CustomerType,
} from '../../../common/model/customer.model';
import {
  customerTypeTable,
  customerMaritalStatusTable,
  customerEducationTable,
  customerGenderTable,
} from 'src/app/common/table/customer.table';
import { Observable } from 'rxjs';
import { citiesTable } from 'src/app/common/table/cities.table';
import { CITIES } from 'src/app/common/table/cities';
import { City } from '../../../common/class/city';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-query-group',
  templateUrl: './query-group.component.html',
  styleUrls: ['./query-group.component.less'],
})
export class QueryGroupComponent implements OnInit, OnChanges {
  constructor() {}

  @Input()
  data;

  @Input()
  index;

  @Output()
  delete = new EventEmitter<number>();

  operatorTable = {
    AND: '且',
    OR: '或',
  };

  typeList = [
    {
      value: 'type',
      title: '类型',
      dataType: 'enum',
      dataSource: [CustomerType.NORMAL, CustomerType.VIP],
      dataTable: customerTypeTable,
      defaultOperator: 'IN',
      defaultValue: [],
    },
    {
      value: 'level',
      title: '等级',
      dataType: 'int',
      min: 1,
      max: 6,
      defaultOperator: '=',
      defaultValue: '',
    },
    {
      value: 'registrationTime',
      title: '注册时间',
      dataType: 'date',
      defaultOperator: '=',
      defaultValue: '',
    },
    {
      value: 'gender',
      title: '性别',
      dataType: 'enum',
      dataSource: [
        CustomerGender.UN_KNOW,
        CustomerGender.MALE,
        CustomerGender.FEMALE,
        CustomerGender.OTHER,
      ],
      dataTable: customerGenderTable,
      defaultOperator: 'IN',
      defaultValue: [],
    },
    {
      value: 'birthday',
      title: '生日',
      dataType: 'date',
      defaultOperator: '=',
      defaultValue: '',
    },
    {
      value: 'city',
      title: '城市',
      dataType: 'city',
      defaultOperator: '=',
      defaultValue: '',
    },
    {
      value: 'occupation',
      title: '职业',
      dataType: 'text',
      defaultOperator: '=',
      defaultValue: '',
    },
    {
      value: 'annualIncome',
      title: '年收入',
      dataType: 'int',
      min: 0,
      max: 2147483647,
      defaultOperator: '=',
      defaultValue: '',
    },
    {
      value: 'education',
      title: '学历',
      dataType: 'enum',
      dataSource: [
        CustomerEducation.UN_KNOW,
        CustomerEducation.ASSOCIATE,
        CustomerEducation.BACHELOR,
        CustomerEducation.MASTER,
        CustomerEducation.DOCTOR,
        CustomerEducation.OTHER,
      ],
      dataTable: customerEducationTable,
      defaultOperator: 'IN',
      defaultValue: [],
    },
    {
      value: 'maritalStatus',
      title: '婚姻状况',
      dataType: 'enum',
      dataSource: [
        CustomerMaritalStatus.UN_KNOW,
        CustomerMaritalStatus.MARRIED,
        CustomerMaritalStatus.UNMARRIED,
        CustomerMaritalStatus.OTHER,
      ],
      dataTable: customerMaritalStatusTable,
      defaultOperator: 'IN',
      defaultValue: [],
    },
    {
      value: 'numberOfChildren',
      title: '孩子数量',
      dataType: 'int',
      min: 0,
      max: 127,
      defaultOperator: '=',
      defaultValue: '',
    },
  ];

  typeHash = {};

  city = new FormControl();
  citiesTable = citiesTable;
  CITIES: City[] = CITIES;
  filteredCities: Observable<City[]>;
  cityTimer?: number = null;

  isArray(arr) {
    return Array.isArray(arr);
  }

  ngOnInit() {
    this.filteredCities = this.city.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value && value.name)),
      map(name => (name ? this._cityFilter(name) : this.CITIES.slice())),
    );

    this.city.valueChanges.subscribe(res => {
      if (typeof res === 'object') {
        this.data.rule[2] = res.code || '';
      }
    });

    this.initTypeHash();
  }

  initTypeHash() {
    const typeHash = {};
    this.typeList.forEach(type => {
      typeHash[type.value] = type;
    });
    this.typeHash = typeHash;
  }

  handleToggleOperator() {
    const operator = this.data.operator;
    if (operator === 'AND') {
      this.data.operator = 'OR';
    } else {
      this.data.operator = 'AND';
    }
  }

  handleAddRule() {
    const newRule = {
      type: 'RULE',
      rule: ['type', 'IN', []],
    };
    this.data.children.push(newRule);
  }

  handleAddGroup() {
    const newGroup = {
      type: 'GROUP',
      operator: 'AND',
      children: [],
    };
    this.data.children.push(newGroup);
  }

  handleDelete() {
    if (typeof this.index === 'number') {
      this.delete.emit(this.index);
    }
  }

  handleChildDelete($event: number) {
    this.data.children.splice($event, 1);
  }

  handleDataChange() {
    const rule = this.data.rule;
    const type = this.typeHash[rule[0]];

    this.data.rule[1] = type.defaultOperator;
    this.data.rule[2] = type.defaultValue;
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

  cityDisplay(city?: City): string | undefined {
    return city ? city.name : undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'data') {
        const newData = changes.data.currentValue;

        if (newData.type === 'RULE') {
          if (newData.rule[0] === 'city') {
            const cityData = this.citiesTable[newData.rule[2]];
            this.city.setValue(cityData);
          }
        }
      }
    }
  }
}
