import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Page } from '../../page/page';
import { PermissionListComponent } from '../../page/permission/permission-list/permission-list.component';
import { RoleListComponent } from '../../page/role/role-list/role-list.component';
import { UserListComponent } from '../../page/user/user-list/user-list.component';
import { TabService } from '../tab.service';
import { Tab } from '../../common/class/tab';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  constructor(public tabService: TabService) {}

  @Output() opened = new EventEmitter();

  ngOnInit() {}

  handleOpenUser() {
    this.tabService.mission(
      new Tab({
        title: '用户管理',
        icon: 'person',
        name: 'user-management',
        page: new Page(UserListComponent, {}),
      }),
    );
  }

  handleOpenRole() {
    this.tabService.mission(
      new Tab({
        title: '角色管理',
        icon: 'face',
        name: 'role-management',
        page: new Page(RoleListComponent, {}),
      }),
    );
  }

  handleOpenPermission() {
    this.tabService.mission(
      new Tab({
        title: '权限管理',
        icon: 'vpn_key',
        name: 'permission',
        page: new Page(PermissionListComponent, {}),
      }),
    );
  }
}
