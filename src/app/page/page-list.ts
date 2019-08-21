import { MatSort, MatTableDataSource } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../common/alert.service';

export class PageList {
  deleteHashMap;
  dataSource: MatTableDataSource<any>;
  sort: MatSort;
  items;
  service;
  alertService: AlertService;

  handleDelete(item) {
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
    this.dataSource = new MatTableDataSource<any>(this.items);
    this.dataSource.sort = this.sort;
  }

  isWaiting(uuid) {
    return this.deleteHashMap[uuid] === 'WAITING';
  }

  isDeleting(uuid: any) {
    return this.deleteHashMap[uuid] === 'DELETING';
  }
}
