export default class Utils {
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
}
