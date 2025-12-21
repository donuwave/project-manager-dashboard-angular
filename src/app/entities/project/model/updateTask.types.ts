import { TaskType } from '../../task/model/model/task.types';

export interface IUpdateTask {
  title: string;
  description: string;
  status: TaskType;
  taskID: string;
}
