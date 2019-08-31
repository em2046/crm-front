import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { Permission } from '../../../common/dto/permission.model';
import Utils from '../../../common/utils/utils';
import { PageList } from '../../common/page-list';
import { PageData } from '../../../common/class/page-data';
import { PermissionService } from '../../../common/service/permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['../../common/list.less', './permission-list.component.less'],
})
export class PermissionListComponent extends PageList<Permission>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getLoading = false;
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
    this.getLoading = true;
    this.permissionService
      .getPermissions()
      .pipe(
        finalize(() => {
          this.getLoading = false;
        }),
      )
      .subscribe(res => {
        this.items = res;
        this.updateView();
      });
  }

  refreshPage() {
    this.ngOnInit();
  }
}
