export type TaskType = 'todo' | 'in_progress' | 'done';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskType;
  createdAt: string;
}
