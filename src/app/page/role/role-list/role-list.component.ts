import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../common/alert.service';
import { TabService } from '../../../common/tab.service';
import { Role } from '../../../dto/role.model';
import { PageList } from '../../page-list';
import { PageComponent } from '../../page.component';
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

  // TODO
  handleEdit(role: any) {}
}
