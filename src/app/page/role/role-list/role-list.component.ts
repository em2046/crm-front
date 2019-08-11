import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../alert.service';
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
  users: User[];
  displayedColumns: string[] = ['name', 'title'];

  constructor(
    private roleService: RoleService,
    public alertService: AlertService,
  ) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roleService
      .getRoles(error => {
        this.alertService.alert(error.message);
      })
      .subscribe(res => {
        this.users = res;
      });
  }
}
