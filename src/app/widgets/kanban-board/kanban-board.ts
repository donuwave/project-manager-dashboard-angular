import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {Task} from '../../entities/kanban/model/kanban.types';
import {KanbanCard} from '../../features/kanban-card/kanban-card';

interface Column {
  id: string;
  title: string;
  color: 'purple' | 'orange' | 'green';
  tasks: Task[];
}

@Component({
  selector: "kanban-board",
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanCard],
  templateUrl: './kanban-board.html',
  styleUrls: ['./kanban-board.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  columns: Column[] = [
    {
      id: 'todo', title: 'To Do', color: 'purple',
      tasks: [
        { id:'t1', title:'Brainstorming', description:'Brainstorming brings team members\' diverse experience into play.',
          priority:'Low', comments:12, files:0, assignees:['AB','CD','EF'] },
        { id:'t2', title:'Research', description:'User research helps you to create an optimal product for users.',
          priority:'High', comments:10, files:3, assignees:['GH','https://i.pravatar.cc/28?img=5','IJ'] },
        { id:'t3', title:'Wireframes', description:'Low fidelity wireframes include the most basic content and visuals.',
          priority:'High', comments:12, files:15, assignees:['KL','MN','OP'] },
      ]
    },
    {
      id: 'progress',
      title: 'On Progress',
      color: 'orange',
      tasks: [
        { id:'t4',
          title:'Onboarding Illustrations',
          priority:'Low',
          comments:14,
          files:15,
          assignees:['QR','ST','UV']
        },
        {
          id:'t5',
          title:'Moodboard',
          priority:'Low',
          comments:9,
          files:10,
          assignees:['WX'],
        },
      ]
    },
    {
      id: 'done', title: 'Done', color: 'green',
      tasks: [
        { id:'t6', title:'Mobile App Design', priority:'Medium', comments:12, files:15,
          assignees:['https://i.pravatar.cc/28?img=12','https://i.pravatar.cc/28?img=8'],  },
        { id:'t7', title:'Design System', description:'It just needs to adapt the UI from what you did before',
          priority:'Medium', comments:12, files:15, assignees:['AA','BB','CC'] },
      ]
    }
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  addTask(colId: string) {
    const col = this.columns.find(c => c.id === colId)!;
    col.tasks.unshift({
      id: crypto.randomUUID(),
      title: 'New task',
      description: 'Describe…',
      comments: 0, files: 0, assignees: []
    });
  }

  editingTaskId: string | null = null;

  startEdit(id: string) { this.editingTaskId = id; }
  endEdit() { this.editingTaskId = null; }

  updateTask(colId: string, updated: Task) {
    const col = this.columns.find(c => c.id === colId);
    if (!col) return;
    const i = col.tasks.findIndex(t => t.id === updated.id);
    if (i > -1) col.tasks[i] = { ...col.tasks[i], ...updated };
    this.endEdit();
  }

  removeTask(colId: string, taskId: string) {
    const col = this.columns.find(c => c.id === colId);
    if (!col) return;
    col.tasks = col.tasks.filter(t => t.id !== taskId);
    if (this.editingTaskId === taskId) this.endEdit();
  }

  trackByCol = (_: number, c: Column) => c.id;
  trackByTask = (_: number, t: Task) => t.id;
}
