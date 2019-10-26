import { Component, OnInit, ViewChild } from '@angular/core';
import { PageList } from '../../common/page-list';
import Complaint from '../../../common/dto/complaint.model';
import { PageData } from '../../../common/class/page-data';
import Utils from 'src/app/common/utils/utils';
import { ComplaintService } from '../complaint.service';
import { finalize } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TabService } from '../../../framework/tab.service';
import { AlertService } from '../../../common/service/alert.service';
import { Tab } from '../../../common/class/tab';
import { Page } from '../../../common/class/page';
import { ComplaintEditComponent } from '../edit/complaint-edit.component';
import { taskStatusTable } from 'src/app/common/table/task.table';
import { ComplaintViewComponent } from '../view/complaint-view.component';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['../../common/list.less', './complaint-list.component.less'],
})
export class ComplaintListComponent extends PageList<Complaint>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  taskStatusTable = taskStatusTable;
  dataSource = new MatTableDataSource<Complaint>([]);
  data: any;
  Utils = Utils;
  items: Complaint[];
  displayedColumns: string[] = [
    'title',
    'description',
    'assignee',
    'status',
    'createDate',
    'updateDate',
    'operation',
  ];
  getLoading = false;

  constructor(
    public service: ComplaintService,
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
      .getComplaints({
        page: this.pagination.pageIndex + 1,
        limit: this.pagination.pageSize,
      })
      .pipe(
        finalize(() => {
          this.getLoading = false;
        }),
      )
      .subscribe(res => {
        this.items = res.data;
        this.pagination.length = res.total;

        this.updateView();
      });
  }

  refreshPage() {
    this.ngOnInit();
  }

  handleAdd() {
    this.tabService.mission(
      new Tab({
        title: '投诉新增',
        name: `complaint-new`,
        page: new Page(ComplaintEditComponent, {
          type: 'NEW',
          complaint: {},
        }),
      }),
    );
  }

  handleEdit(complaint: Complaint) {
    this.tabService.mission(
      new Tab({
        title: '投诉编辑',
        name: `complaint-edit#${complaint.uuid}`,
        page: new Page(ComplaintEditComponent, {
          type: 'EDIT',
          complaint,
        }),
      }),
    );
  }

  handleView(complaint: Complaint) {
    this.tabService.mission(
      new Tab({
        title: '投诉查看',
        name: `complaint-view#${complaint.uuid}`,
        page: new Page(ComplaintViewComponent, {
          type: 'VIEW',
          complaint,
        }),
      }),
    );
  }
}
