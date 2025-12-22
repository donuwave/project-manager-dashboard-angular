import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../../entities/kanban/model/kanban.types';
import { KanbanCard } from '../../features/kanban-card/kanban-card';
import { SelectedProjectStore } from '../../entities/project/store/selected-project.store';
import { UserSessionStore } from '../../entities/user/model/user-session.store';
import { firstValueFrom } from 'rxjs';
import { IUpdateTask } from '../../entities/project/model/updateTask.types';

@Component({
  selector: 'kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanCard],
  templateUrl: './kanban-board.html',
  styleUrls: ['./kanban-board.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  private projectStore = inject(SelectedProjectStore);
  columns$ = this.projectStore.onGetTasks$();
  private session = inject(UserSessionStore);

  async drop(event: CdkDragDrop<Task[]>, colId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const moved = event.container.data[event.currentIndex];

    await this.projectStore.onUpdateTask({
      taskID: moved.id,
      status: this.projectStore.getIndexStatus(colId),
      position: event.currentIndex,
    });
  }

  async addTask(colId: number) {
    await this.projectStore.onAddTask({
      status: this.projectStore.getIndexStatus(colId),
      title: 'Base',
      description: 'Base',
    });
  }

  editingTaskId: string | null = null;

  startEdit(id: string) {
    this.editingTaskId = id;
  }
  endEdit() {
    this.editingTaskId = null;
  }

  async updateTask(colId: number, updated: Omit<IUpdateTask, 'status'>) {
    await this.projectStore.onUpdateTask({
      status: this.projectStore.getIndexStatus(colId),
      ...updated,
    });
    this.endEdit();
  }

  async removeTask(taskId: string) {
    const user = await firstValueFrom(this.session.me$);
    if (!user) return;

    await this.projectStore.onDeleteTask({ taskID: taskId, actorID: user.id });
  }
}
