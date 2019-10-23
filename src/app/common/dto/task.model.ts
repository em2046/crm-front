/**
 * 任务状态
 */
export enum TaskStatus {
  /**
   * 已创建
   */
  CREATED = 'created',

  /**
   * 已分配
   */
  ASSIGNED = 'assigned',

  /**
   * 已完成
   */
  FINISHED = 'finished',
}

export default class Task {
  uuid?: string;
  title?: string;
  description?: string;
  assignee?: string;
  status?: TaskStatus;
  createDate?: string;
  updateDate?: string;
}
