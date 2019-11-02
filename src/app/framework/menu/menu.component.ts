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
import { ComplaintListComponent } from '../../page/complaint/list/complaint-list.component';
import { LabelListComponent } from '../../page/label/list/label-list.component';
import { StatisticsComponent } from '../../page/statistics/statistics.component';
import { SaleListComponent } from '../../page/sale/list/sale-list.component';

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
        title: '权限查看',
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
        icon: 'search',
        name: 'knowledge-search',
        page: new Page(KnowledgeSearchComponent, {}),
      }),
    );
  }

  handleOpenComplaint() {
    this.tabService.mission(
      new Tab({
        title: '客户投诉',
        icon: 'chat',
        name: 'complaint-list',
        page: new Page(ComplaintListComponent, {}),
      }),
    );
  }

  handleOpenLabel() {
    this.tabService.mission(
      new Tab({
        title: '标签',
        icon: 'loyalty',
        name: 'label-list',
        page: new Page(LabelListComponent, {}),
      }),
    );
  }

  handleOpenStatistics() {
    this.tabService.mission(
      new Tab({
        title: '数据统计',
        icon: 'equalizer',
        name: 'statistics',
        page: new Page(StatisticsComponent, {}),
      }),
    );
  }

  handleOpenSale() {
    this.tabService.mission(
      new Tab({
        title: '营销任务',
        icon: 'trending_up',
        name: 'sale-list',
        page: new Page(SaleListComponent, {}),
      }),
    );
  }
}
