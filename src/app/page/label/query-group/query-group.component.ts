import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-query-group',
  templateUrl: './query-group.component.html',
  styleUrls: ['./query-group.component.less'],
})
export class QueryGroupComponent implements OnInit {
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
      dataType: 'custom',
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

  isArray(arr) {
    return Array.isArray(arr);
  }

  ngOnInit() {
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
}
