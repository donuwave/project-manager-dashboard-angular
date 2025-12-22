import { TaskType } from '../../task/model/model/task.types';

export interface IUpdateTask {
  taskID: string;
  status: TaskType;
  position?: number;
  title?: string;
  description?: string;
}
