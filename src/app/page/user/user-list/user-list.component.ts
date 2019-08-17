import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../common/alert.service';
import { Tab } from '../../../core/tab';
import { HttpResult } from '../../../dto/http-result';
import { User } from '../../../dto/user.model';
import { TabService } from '../../../common/tab.service';
import { Page } from '../../page';
import { PageComponent } from '../../page.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../../../common/user.service';
import Utils from '../../../../utils/utils';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../list.less', './user-list.component.less'],
})
export class UserListComponent implements OnInit, PageComponent {
  data: any;
  Utils = Utils;
  users: User[];
  waitDeleteIndex = {};
  displayedColumns: string[] = [
    'name',
    'realName',
    'roles',
    'avatar',
    'email',
    'operation',
  ];

  constructor(
    private userService: UserService,
    public tabService: TabService,
    private readonly alertService: AlertService,
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
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

  handleDelete(user: User) {
    if (this.waitDeleteIndex[user.uuid]) {
      this.userService.remove(user.uuid).subscribe((res: HttpResult) => {
        if (res.statusCode === 0) {
          this.users = this.users.filter(u => {
            return u.uuid !== user.uuid;
          });
        }
        this.alertService.alert(res.message);
      });
      return;
    }

    this.waitDeleteIndex[user.uuid] = true;
    setTimeout(() => {
      this.waitDeleteIndex[user.uuid] = false;
    }, 3000);
  }

  refreshPage() {
    this.ngOnInit();
  }
}
