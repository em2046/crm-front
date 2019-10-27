import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.less'],
})
export class LabelEditComponent implements OnInit {
  constructor() {}

  queryJson = {
    type: 'GROUP',
    operator: 'AND',
    children: [
      {
        type: 'GROUP',
        operator: 'AND',
        children: [
          {
            type: 'GROUP',
            operator: 'AND',
            children: [
              {
                type: 'RULE',
                rule: ['type', '=', 'vip'],
              },
            ],
          },
          {
            type: 'RULE',
            rule: ['level', '=', 6],
          },
        ],
      },
      {
        type: 'GROUP',
        operator: 'AND',
        children: [
          {
            type: 'RULE',
            rule: ['registrationTime', '>', '2015-10-06'],
          },
          {
            type: 'RULE',
            rule: ['registrationTime', '<', '2015-10-07'],
          },
        ],
      },
    ],
  };

  ngOnInit() {}

  handleSubmit() {
    console.log(this.queryJson);
  }
}
