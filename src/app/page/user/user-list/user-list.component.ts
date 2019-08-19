import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../common/alert.service';
import { Tab } from '../../../core/tab';
import { User } from '../../../dto/user.model';
import { TabService } from '../../../common/tab.service';
import { Page } from '../../page';
import { PageList } from '../../page-list';
import { PageComponent } from '../../page.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../../../common/user.service';
import Utils from '../../../../utils/utils';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../list.less', './user-list.component.less'],
})
export class UserListComponent extends PageList
  implements OnInit, PageComponent {
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
    this.service.getUsers().subscribe(res => {
      this.items = res;
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
