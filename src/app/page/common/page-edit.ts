import { finalize } from 'rxjs/operators';
import { Entity } from '../../common/class/entity';
import { AlertService } from '../../common/service/alert.service';
import Utils from '../../common/utils/utils';

export abstract class PageEdit<T extends Entity> {
  Utils = Utils;
  isEdit = false;
  editForm;
  saveLoading = false;
  service;
  alertService: AlertService;

  abstract onSubmit(data: T);

  saveNew(itemData: T) {
    this.service
      .create(itemData)
      .pipe(
        finalize(() => {
          this.saveLoading = false;
        }),
      )
      .subscribe(() => {
        this.alertService.snack('保存成功');
      });
  }

  saveEdit(item, itemData: T) {
    this.service
      .update(item.uuid, itemData)
      .pipe(
        finalize(() => {
          this.saveLoading = false;
        }),
      )
      .subscribe(() => {
        this.alertService.snack('保存成功');
      });
  }

  resetForm() {
    if (this.isEdit) {
      this.resetEdit();
    } else {
      this.resetNew();
    }
  }

  abstract resetNew();

  abstract resetEdit();
}
