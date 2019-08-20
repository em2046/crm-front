import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../common/alert.service';
import { TabService } from '../../../common/tab.service';
import { Tab } from '../../../core/tab';
import { Role } from '../../../dto/role.model';
import { User } from '../../../dto/user.model';
import { Page } from '../../page';
import { PageList } from '../../page-list';
import { PageComponent } from '../../page.component';
import { RoleEditComponent } from '../role-edit/role-edit.component';
import { RoleService } from '../role.service';
import Utils from '../../../../utils/utils';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['../../list.less', './role-list.component.less'],
})
export class RoleListComponent extends PageList
  implements OnInit, PageComponent {
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
    this.service.getRolesJoinPermissions().subscribe(res => {
      this.items = res;
    });
  }

  refreshPage() {
    this.ngOnInit();
  }

  handleAdd() {
    this.tabService.mission(
      new Tab({
        title: '角色新增',
        name: 'role-add',
        page: new Page(RoleEditComponent, {
          type: 'NEW',
          user: {},
        }),
      }),
    );
  }

  handleEdit(user: User) {
    this.tabService.mission(
      new Tab({
        title: '角色编辑',
        name: `role-edit#${user.uuid}`,
        page: new Page(RoleEditComponent, {
          type: 'EDIT',
          user,
        }),
      }),
    );
  }
}
