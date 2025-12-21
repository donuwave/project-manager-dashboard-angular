import { TaskType } from '../../task/model/model/task.types';

export interface ICreateTask {
  projectId: string;
  title: string;
  description: string;
  status: TaskType;
}
