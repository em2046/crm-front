import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Page } from '../../common/class/page';
import { PermissionListComponent } from '../../page/permission/list/permission-list.component';
import { RoleListComponent } from '../../page/role/list/role-list.component';
import { UserListComponent } from '../../page/user/list/user-list.component';
import { TabService } from '../tab.service';
import { Tab } from '../../common/class/tab';
import { CustomerListComponent } from '../../page/customer/list/customer-list.component';
import { KnowledgeListComponent } from '../../page/knowledge/list/knowledge-list.component';
import { KnowledgeSearchComponent } from '../../page/knowledge/search/knowledge-search.component';

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

  handleOpenCustomer() {
    this.tabService.mission(
      new Tab({
        title: '客户管理',
        icon: 'supervisor_account',
        name: 'customer',
        page: new Page(CustomerListComponent, {}),
      }),
    );
  }

  handleOpenKnowledgeList() {
    this.tabService.mission(
      new Tab({
        title: '知识管理',
        icon: 'local_library',
        name: 'knowledge-list',
        page: new Page(KnowledgeListComponent, {}),
      }),
    );
  }

  handleOpenKnowledgeSearch() {
    this.tabService.mission(
      new Tab({
        title: '知识查询',
        icon: 'local_library',
        name: 'knowledge-search',
        page: new Page(KnowledgeSearchComponent, {}),
      }),
    );
  }
}
