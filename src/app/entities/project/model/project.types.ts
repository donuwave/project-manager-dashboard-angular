import { IUser } from '../../user/model/user.types';
import { ITask } from '../../task/model/model/task.types';

export interface IProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  position: number;
  users: IUser[];
  tasks: ITask[];
}
