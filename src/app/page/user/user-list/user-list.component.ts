import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../../../common/service/alert.service';
import { Tab } from '../../../common/class/tab';
import { User } from '../../../common/dto/user.model';
import { TabService } from '../../../framework/tab.service';
import { Page } from '../../../common/class/page';
import { PageList } from '../../page-list';
import { PageData } from '../../../common/class/page-data';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../../../common/service/user.service';
import Utils from '../../../common/utils/utils';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../list.less', './user-list.component.less'],
})
export class UserListComponent extends PageList<User>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<User>([]);

  getLoading = false;
  data: any;
  Utils = Utils;
  items: User[];
  deleteHashMap = {};
  displayedColumns: string[] = [
    'name',
    'realName',
    'roles',
    'avatar',
    'email',
    'operation',
  ];

  constructor(
    public service: UserService,
    public tabService: TabService,
    public alertService: AlertService,
  ) {
    super();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.getLoading = true;
    this.service
      .getAll()
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
        title: '用户新增',
        name: 'user-add',
        page: new Page(UserEditComponent, {
          type: 'NEW',
          user: {},
        }),
      }),
    );
  }

  handleEdit(user: User) {
    this.tabService.mission(
      new Tab({
        title: '用户编辑',
        name: `user-edit#${user.uuid}`,
        page: new Page(UserEditComponent, {
          type: 'EDIT',
          user,
        }),
      }),
    );
  }

  refreshPage() {
    this.ngOnInit();
  }
}
