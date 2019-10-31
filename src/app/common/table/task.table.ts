import { TaskStatus } from '../model/task.model';

export const taskStatusTable = {
  [TaskStatus.CREATED]: { title: '已创建' },
  [TaskStatus.ASSIGNED]: { title: '已分配' },
  [TaskStatus.FINISHED]: { title: '已完成' },
};
