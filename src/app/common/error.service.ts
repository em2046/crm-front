import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private readonly alertService: AlertService) {}

  /**
   * 错误处理
   */
  handleError() {
    return error => {
      if (error.error.statusCode) {
        console.error('出错了', error.error.message);
        this.alertService.alert(error.error.message);
      } else {
        console.error(`错误码`, error.status, `错误`, error.error);
        this.alertService.alert('服务器错误');
      }
      return throwError('出错了，请稍后再试');
    };
  }
}
