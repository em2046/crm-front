import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../alert.service';
import { Role } from '../../../dto/role.model';
import { User } from '../../../dto/user.model';
import { PageComponent } from '../../page.component';
import { RoleService } from '../../role/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less'],
})
export class UserEditComponent implements OnInit, PageComponent {
  roles: Role[] = [];
  data: User;

  constructor(
    public roleService: RoleService,
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
        this.roles = res;
      });
  }

  handleClickRole(role: Role) {
    console.log(role);
  }
}
