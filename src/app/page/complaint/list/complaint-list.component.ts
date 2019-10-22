import { Component, OnInit, ViewChild } from '@angular/core';
import { PageList } from '../../common/page-list';
import Complaint from '../../../common/dto/complaint.model';
import { PageData } from '../../../common/class/page-data';
import Utils from 'src/app/common/utils/utils';
import { ComplaintService } from '../complaint.service';
import { finalize } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TabService } from '../../../framework/tab.service';
import { AlertService } from '../../../common/service/alert.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['../../common/list.less', './complaint-list.component.less'],
})
export class ComplaintListComponent extends PageList<Complaint>
  implements OnInit, PageData {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Complaint>([]);
  data: any;
  Utils = Utils;
  items: Complaint[];
  displayedColumns: string[] = ['title', 'description', 'operation'];
  getLoading = false;

  constructor(
    public service: ComplaintService,
    public tabService: TabService,
    public alertService: AlertService,
  ) {
    super();
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.getLoading = true;
    this.service
      .getComplaints({
        page: this.pagination.pageIndex + 1,
        limit: this.pagination.pageSize,
      })
      .pipe(
        finalize(() => {
          this.getLoading = false;
        }),
      )
      .subscribe(res => {
        this.items = res.data;
        this.pagination.length = res.total;

        this.updateView();
      });
  }

  refreshPage() {
    this.ngOnInit();
  }

  handleAdd() {}

  handleEdit(element: any) {}
}
