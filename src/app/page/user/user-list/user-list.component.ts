import { Component, OnInit } from '@angular/core';
import { Tab } from '../../../core/tab';
import { User } from '../../../dto/user.model';
import { TabService } from '../../../common/tab.service';
import { Page } from '../../page';
import { PageComponent } from '../../page.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../user.service';
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
  displayedColumns: string[] = [
    'avatar',
    'name',
    'roles',
    'realName',
    'email',
    'operation',
  ];

  constructor(
    private userService: UserService,
    public tabService: TabService,
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers()
      .subscribe(res => {
        this.users = res;
      });
  }

  handleEdit(user: User) {
    this.tabService.mission(
      new Tab({
        title: '用户编辑',
        name: `user-edit#${user.uuid}`,
        page: new Page(UserEditComponent, user),
      }),
    );
  }

  // TODO
  handleDelete(user: User) {

  }
}
