import { Component, inject } from '@angular/core';
import { BoardComponent } from '../../widgets/kanban-board/kanban-board';
import { AsyncPipe } from '@angular/common';
import { SelectedProjectStore } from '../../entities/project/store/selected-project.store';
import { ProjectEdit } from '../../features/project-edit/project-edit';
import { ProjectInvite } from '../../features/project-invite/project-invite';

@Component({
  selector: 'app-project',
  imports: [BoardComponent, AsyncPipe, ProjectEdit, ProjectInvite],
  templateUrl: './project.html',
  styleUrl: './project.scss',
  standalone: true,
})
export class Project {
  private project = inject(SelectedProjectStore);

  project$ = this.project.project$;

  async onUpdate(name: string) {
    await this.project.onUpdate({ name });
  }
}
