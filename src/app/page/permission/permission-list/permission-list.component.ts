import { Component, OnInit } from '@angular/core';
import { User } from '../../../dto/user.model';
import Utils from '../../../../utils/utils';
import { PageComponent } from '../../page.component';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.less'],
})
export class PermissionListComponent implements OnInit, PageComponent {
  data: any;
  Utils = Utils;
  users: User[];
  displayedColumns: string[] = ['name', 'title'];

  constructor(private permissionService: PermissionService) {}

  ngOnInit() {
    this.getPermission();
  }

  getPermission() {
    this.permissionService.getPermissions().subscribe(res => {
      this.users = res;
    });
  }
}
