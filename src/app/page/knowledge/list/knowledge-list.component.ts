import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../../../common/service/alert.service';
import { Tab } from '../../../common/class/tab';
import { TabService } from '../../../framework/tab.service';
import { Page } from '../../../common/class/page';
import { PageList } from '../../common/page-list';
import { PageData } from '../../../common/class/page-data';
import { KnowledgeService } from '../knowledge.service';
import Utils from '../../../common/utils/utils';
import { Knowledge } from '../../../common/dto/knowledge.model';
import { KnowledgeEditComponent } from '../edit/knowledge-edit.component';

@Component({
  selector: 'app-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['../../common/list.less', './knowledge-list.component.less'],
})
export class KnowledgeListComponent extends PageList<Knowledge>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getLoading = false;
  data: any;
  Utils = Utils;
  items: Knowledge[];
  dataSource = new MatTableDataSource<Knowledge>([]);
  displayedColumns: string[] = ['title', 'author', 'operation'];

  constructor(
    public service: KnowledgeService,
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
      .getKnowledgeList({
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
        title: '知识新增',
        name: 'knowledge-add',
        page: new Page(KnowledgeEditComponent, {
          type: 'NEW',
          user: {},
        }),
      }),
    );
  }

  handleEdit(knowledge: Knowledge) {
    this.tabService.mission(
      new Tab({
        title: '知识编辑',
        name: `knowledge-edit#${knowledge.uuid}`,
        page: new Page(KnowledgeEditComponent, {
          type: 'EDIT',
          knowledge,
        }),
      }),
    );
  }

  refreshPage() {
    this.ngOnInit();
  }
}
