import { Component, Input, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { Task } from '../../entities/kanban/model/kanban.types';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kanban-card',
  imports: [NgClass, FormsModule],
  templateUrl: './kanban-card.html',
  styleUrl: './kanban-card.scss',
  standalone: true,
})
export class KanbanCard implements OnChanges {
  @Input() task!: Task;
  @Input() editing = false;

  @Output() update = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<string>();
  @Output() editStart = new EventEmitter<string>();
  @Output() editCancel = new EventEmitter<void>();

  menuOpen = false;

  draft = { title: '', description: '', priority: undefined as Task['priority'] | undefined };

  ngOnChanges() {
    if (this.editing) {
      this.draft.title = this.task.title ?? '';
      this.draft.description = this.task.description ?? '';
      this.draft.priority = this.task.priority;
    }
  }

  toggleMenu(e: MouseEvent) {
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }
  @HostListener('document:click') closeMenu() {
    this.menuOpen = false;
  }

  startEdit() {
    this.menuOpen = false;
    this.editStart.emit(this.task.id);
  }

  save() {
    this.update.emit({
      ...this.task,
      title: this.draft.title,
      description: this.draft.description || undefined,
      priority: this.draft.priority,
    });
  }

  cancel() {
    this.editCancel.emit();
  }
  onDelete() {
    this.remove.emit(this.task.id);
  }
}
