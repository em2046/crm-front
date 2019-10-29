import { MatSort, MatTableDataSource } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { Entity } from '../../common/class/entity';
import { AlertService } from '../../common/service/alert.service';

export abstract class PageList<T extends Entity> {
  deleteHashMap = {};
  dataSource: MatTableDataSource<T>;
  sort: MatSort;
  items: T[];
  service;
  alertService: AlertService;
  stickyEnd = true;
  pagination = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
  };

  abstract getItems();

  handlePageEvent(e) {
    this.pagination.pageSize = e.pageSize;
    this.pagination.pageIndex = e.pageIndex;
    this.getItems();
  }

  handleToggleSticky() {
    this.stickyEnd = !this.stickyEnd;
  }

  handleDelete(item: T) {
    const deleteHashMap = this.deleteHashMap;
    const service = this.service;
    if (deleteHashMap[item.uuid] === 'WAITING') {
      deleteHashMap[item.uuid] = 'DELETING';
      service
        .remove(item.uuid)
        .pipe(
          finalize(() => {
            deleteHashMap[item.uuid] = null;
          }),
        )
        .subscribe(() => {
          deleteHashMap[item.uuid] = 'DELETED';
          this.items = this.items.filter(u => {
            return u.uuid !== item.uuid;
          });
          this.updateView();
          this.alertService.snack('删除成功');
        });
      return;
    }

    deleteHashMap[item.uuid] = 'WAITING';
    setTimeout(() => {
      if (deleteHashMap[item.uuid] === 'WAITING') {
        deleteHashMap[item.uuid] = null;
      }
    }, 3000);
  }

  updateView() {
    this.dataSource = new MatTableDataSource<T>(this.items);
    this.dataSource.sort = this.sort;
  }

  isWaiting(uuid: string) {
    return this.deleteHashMap[uuid] === 'WAITING';
  }

  isDeleting(uuid: string) {
    return this.deleteHashMap[uuid] === 'DELETING';
  }
}
