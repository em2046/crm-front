import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Permission } from '../../../common/dto/permission.model';
import Utils from '../../../common/utils/utils';
import { PageList } from '../../page-list';
import { PageData } from '../../../common/class/page-data';
import { PermissionService } from '../../../common/service/permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['../../list.less', './permission-list.component.less'],
})
export class PermissionListComponent extends PageList<Permission>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Permission>([]);
  data: any;
  Utils = Utils;
  items: Permission[];
  displayedColumns: string[] = ['name', 'title'];

  constructor(private permissionService: PermissionService) {
    super();
  }

  ngOnInit() {
    this.getPermission();
  }

  getPermission() {
    this.permissionService.getPermissions().subscribe(res => {
      this.items = res;
      this.updateView();
    });
  }

  refreshPage() {
    this.ngOnInit();
  }
}
