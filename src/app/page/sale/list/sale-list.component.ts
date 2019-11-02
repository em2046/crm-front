import { Component, OnInit, ViewChild } from '@angular/core';
import { Tab } from '../../../common/class/tab';
import { Page } from '../../../common/class/page';
import { SaleEditComponent } from '../edit/sale-edit.component';
import { PageList } from '../../common/page-list';
import Sale from '../../../common/model/sale.model';
import { TabService } from '../../../framework/tab.service';
import { AlertService } from '../../../common/service/alert.service';
import { SaleService } from '../sale.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { PageData } from '../../../common/class/page-data';
import Utils from 'src/app/common/utils/utils';
import { taskStatusTable } from 'src/app/common/table/task.table';
import { finalize } from 'rxjs/operators';
import { SaleViewComponent } from '../view/sale-view.component';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['../../common/list.less', './sale-list.component.less'],
})
export class SaleListComponent extends PageList<Sale>
  implements OnInit, PageData {
  constructor(
    public service: SaleService,
    public tabService: TabService,
    public alertService: AlertService,
  ) {
    super();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getLoading = false;

  taskStatusTable = taskStatusTable;
  dataSource = new MatTableDataSource<Sale>([]);
  data: any;
  Utils = Utils;
  items: Sale[];
  displayedColumns: string[] = [
    'title',
    'description',
    'assignee',
    'status',
    'createDate',
    'updateDate',
    'operation',
  ];

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.getLoading = true;
    this.service
      .getSales({
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

  handleAdd() {
    this.tabService.mission(
      new Tab({
        title: '任务新增',
        name: `sale-new`,
        page: new Page(SaleEditComponent, {
          type: 'NEW',
          sale: {},
        }),
      }),
    );
  }
  handleEdit(sale: Sale) {
    this.tabService.mission(
      new Tab({
        title: '任务编辑',
        name: `sale-edit#${sale.uuid}`,
        page: new Page(SaleEditComponent, {
          type: 'EDIT',
          sale,
        }),
      }),
    );
  }

  handleView(sale: Sale) {
    this.tabService.mission(
      new Tab({
        title: '任务查看',
        name: `sale-view#${sale.uuid}`,
        page: new Page(SaleViewComponent, {
          type: 'VIEW',
          sale,
        }),
      }),
    );
  }
  refreshPage() {
    this.ngOnInit();
  }
}
