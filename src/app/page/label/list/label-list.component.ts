import { Component, OnInit, ViewChild } from '@angular/core';
import { PageList } from '../../common/page-list';
import { Label } from '../../../common/model/label.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import Utils from 'src/app/common/utils/utils';
import { LabelService } from '../label.service';
import { finalize } from 'rxjs/operators';
import { TabService } from '../../../framework/tab.service';
import { Tab } from '../../../common/class/tab';
import { Page } from 'src/app/common/class/page';
import { LabelEditComponent } from '../edit/label-edit.component';
import { PageData } from '../../../common/class/page-data';
import { AlertService } from '../../../common/service/alert.service';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['../../common/list.less', './label-list.component.less'],
})
export class LabelListComponent extends PageList<Label>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getLoading = false;
  dataSource = new MatTableDataSource<Label>([]);
  data: any;
  Utils = Utils;
  items: Label[];
  displayedColumns: string[] = ['title', 'operation'];

  constructor(
    public service: LabelService,
    public tabService: TabService,
    public alertService: AlertService,
  ) {
    super();
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.getLoading = true;
    this.service
      .getLabels()
      .pipe(
        finalize(() => {
          this.getLoading = false;
        }),
      )
      .subscribe(res => {
        this.items = res;
        this.updateView();
      });
  }

  refreshPage() {
    this.ngOnInit();
  }

  handleAdd() {
    this.tabService.mission(
      new Tab({
        title: '标签新增',
        name: 'label-add',
        page: new Page(LabelEditComponent, {
          type: 'NEW',
          user: {},
        }),
      }),
    );
  }

  handleEdit(label: Label) {
    this.tabService.mission(
      new Tab({
        title: '标签编辑',
        name: `label-edit#${label.uuid}`,
        page: new Page(LabelEditComponent, {
          type: 'EDIT',
          label,
        }),
      }),
    );
  }
}
