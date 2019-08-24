import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../../../common/service/alert.service';
import { TabService } from '../../../framework/tab.service';
import { Tab } from '../../../common/class/tab';
import { Role } from '../../../common/dto/role.model';
import { Page } from '../../../common/class/page';
import { PageList } from '../../common/page-list';
import { PageData } from '../../../common/class/page-data';
import { RoleEditComponent } from '../edit/role-edit.component';
import { RoleService } from '../../../common/service/role.service';
import Utils from '../../../common/utils/utils';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['../../common/list.less', './role-list.component.less'],
})
export class RoleListComponent extends PageList<Role>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Role>([]);

  getLoading = false;
  data: any;
  Utils = Utils;
  items: Role[];
  displayedColumns: string[] = ['name', 'title', 'permissions', 'operation'];
  deleteHashMap = {};

  constructor(
    public service: RoleService,
    public tabService: TabService,
    public alertService: AlertService,
  ) {
    super();
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.getLoading = true;
    this.service
      .getAllJoinPermissions()
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

  handleAdd() {
    this.tabService.mission(
      new Tab({
        title: '角色新增',
        name: 'role-add',
        page: new Page(RoleEditComponent, {
          type: 'NEW',
          role: {},
        }),
      }),
    );
  }

  handleEdit(role: Role) {
    this.tabService.mission(
      new Tab({
        title: '角色编辑',
        name: `role-edit#${role.uuid}`,
        page: new Page(RoleEditComponent, {
          type: 'EDIT',
          role,
        }),
      }),
    );
  }

  refreshPage() {
    this.ngOnInit();
  }
}
