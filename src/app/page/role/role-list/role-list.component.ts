import { Component, OnInit } from '@angular/core';
import { Role } from '../../../dto/role.model';
import { PageComponent } from '../../page.component';
import { RoleService } from '../role.service';
import Utils from '../../../../utils/utils';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['../../list.less', './role-list.component.less'],
})
export class RoleListComponent implements OnInit, PageComponent {
  data: any;
  Utils = Utils;
  roles: Role[];
  displayedColumns: string[] = ['name', 'title', 'permissions'];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRolesJoinPermissions().subscribe(res => {
      this.roles = res;
    });
  }

  refreshPage() {
    this.ngOnInit();
  }
}
