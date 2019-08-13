import { Component, OnInit } from '@angular/core';
import { Role } from '../../../dto/role.model';
import { User } from '../../../dto/user.model';
import { PageComponent } from '../../page.component';
import { RoleService } from '../role.service';
import Utils from '../../../../utils/utils';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.less'],
})
export class RoleListComponent implements OnInit, PageComponent {
  data: any;
  Utils = Utils;
  roles: Role[];
  displayedColumns: string[] = ['name', 'title'];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles().subscribe(res => {
      this.roles = res;
    });
  }
}
