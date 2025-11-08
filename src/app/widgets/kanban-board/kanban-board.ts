import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

type Priority = 'Low' | 'High' | 'Completed';
interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  comments: number;
  files: number;
  assignees: string[];   // ссылки на аватарки или инициалы
  coverUrl?: string;
}
interface Column {
  id: string;
  title: string;
  color: 'purple' | 'orange' | 'green';
  tasks: Task[];
}

@Component({
  selector: 'kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
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
          coverUrl:'https://picsum.photos/seed/ill/640/360',
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
          coverUrl:'https://picsum.photos/seed/mood/640/360'
        },
      ]
    },
    {
      id: 'done', title: 'Done', color: 'green',
      tasks: [
        { id:'t6', title:'Mobile App Design', priority:'Completed', comments:12, files:15,
          assignees:['https://i.pravatar.cc/28?img=12','https://i.pravatar.cc/28?img=8'], coverUrl:'https://picsum.photos/seed/app/640/360' },
        { id:'t7', title:'Design System', description:'It just needs to adapt the UI from what you did before',
          priority:'Completed', comments:12, files:15, assignees:['AA','BB','CC'] },
      ]
    }
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    localStorage.setItem('board', JSON.stringify(this.columns)); // опционально
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

  trackByCol = (_: number, c: Column) => c.id;
  trackByTask = (_: number, t: Task) => t.id;
}
