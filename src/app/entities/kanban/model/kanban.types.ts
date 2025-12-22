export type Priority = 'Low' | 'High' | 'Medium';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  comments: number;
  files: number;
  position: number;
  assignees: string[];
}
