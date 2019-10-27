import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  ngOnInit() {}

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
      rule: ['type', '=', 'vip'],
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
      // console.log(this.index);
      this.delete.emit(this.index);
    }
  }

  handleChildDelete($event: number) {
    console.log($event);
    this.data.children.splice($event, 1);
  }
}
