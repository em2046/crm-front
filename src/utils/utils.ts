import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export default class Utils {
  /**
   * HTTP请求参数
   */
  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * 生成区间随机数
   * @param low 下界
   * @param high 上界
   */
  static randomRange(low: number, high: number): number {
    const range = high - low;
    return Math.random() * range + low;
  }

  /**
   * 随机选择一项
   * @param item 选项
   */
  static randomSelect(...item) {
    return item[Math.floor(Math.random() * item.length)];
  }

  /**
   * 代码转emoji表情
   * @param code emoji对应的代码
   */
  static codeToEmoji(code?: number): string {
    if (!code) {
      return '';
    }
    return String.fromCodePoint(code);
  }

  /**
   * 获取验证信息
   * @param field 字段对象
   * @param label 字段名称
   */
  static getValidateMessage(field, label) {
    if (field.errors.required) {
      return `${label}必须填写`;
    }
    if (field.errors.email) {
      return `必须填写正确的邮箱地址`;
    }
    if (field.errors.minlength) {
      return `${label}不能少于${field.errors.minlength.requiredLength}个字符`;
    }
    if (field.errors.maxlength) {
      return `${label}不能多于${field.errors.maxlength.requiredLength}个字符`;
    }
    return '';
  }

  /**
   * 错误处理
   * @param error 错误对象
   */
  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
