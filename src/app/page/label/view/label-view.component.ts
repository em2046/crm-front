import { Component, OnInit } from '@angular/core';
import { PageData } from '../../../common/class/page-data';
import { LabelService } from '../label.service';
import { Label } from '../../../common/model/label.model';
import { Customer } from '../../../common/model/customer.model';
import { Tab } from '../../../common/class/tab';
import { Page } from '../../../common/class/page';
import { CustomerViewComponent } from '../../customer/view/customer-view.component';
import { TabService } from '../../../framework/tab.service';

@Component({
  selector: 'app-label-view',
  templateUrl: './label-view.component.html',
  styleUrls: ['./label-view.component.less'],
})
export class LabelViewComponent implements OnInit, PageData {
  data: {
    type: string;
    label: Label;
  };
  label: Label = { title: '' };
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
  customerList: Customer[];
  constructor(public service: LabelService, public tabService: TabService) {}

  ngOnInit() {
    this.getLabel(this.data.label.uuid);
  }
  private getLabel(uuid: string) {
    this.service.getLabel(uuid).subscribe(res => {
      this.label = res;
      this.ruleJson = res.rule;
      this.query();
    });
  }

  query() {
    this.service.query(this.ruleJson).subscribe(res => {
      this.customerList = res;
    });
  }

  handleCustomerView(customer: Customer) {
    this.tabService.mission(
      new Tab({
        title: '客户查看',
        name: `customer-view#${customer.uuid}`,
        page: new Page(CustomerViewComponent, {
          type: 'VIEW',
          customer,
        }),
      }),
    );
  }
}
