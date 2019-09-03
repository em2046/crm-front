import { HttpHeaders } from '@angular/common/http';

export default class Utils {
  static pageSizeOptions: number[] = [5, 10, 25, 100];

  /**
   * HTTP请求不含认证数据
   */
  static httpOptionsWithoutAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * HTTP请求参数含认证
   */
  static httpOptions = Utils.getHeaders();

  /**
   * 获取认证信息
   */
  private static getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Utils.accessToken(),
      }),
    };
  }

  /**
   * 更新认证信息
   */
  static updateAuth() {
    Utils.httpOptions = Utils.getHeaders();
  }

  /**
   * 获取身份信息
   */
  static accessToken() {
    return sessionStorage.getItem('access_token');
  }

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
    if (field.errors.min) {
      return `${label}不能小于${field.errors.min.min}`;
    }
    if (field.errors.max) {
      return `${label}不能大于${field.errors.max.max}`;
    }
    return '';
  }
}
