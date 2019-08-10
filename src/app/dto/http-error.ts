/**
 * 接口返回值
 */
export class HttpError {
  /**
   * 返回代号
   */
  statusCode: number;
  /**
   * 返回信息
   */
  message: string;
  /**
   * 返回错误
   */
  error: string;

  constructor(options) {
    Object.assign(this, options);
  }
}
