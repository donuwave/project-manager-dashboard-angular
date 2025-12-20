import { Injectable, inject } from '@angular/core';
import { Subject, startWith, switchMap, shareReplay } from 'rxjs';
import { ProjectService } from '../api/project.service';
import { IDeleteProject } from '../model/deleteProject.types';

@Injectable({ providedIn: 'root' })
export class ProjectsStore {
  private projectService = inject(ProjectService);
  private refresh$ = new Subject<void>();

  readonly projects$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() => this.projectService.getProjects()),
    shareReplay(1),
  );

  reload() {
    this.refresh$.next();
  }

  async createProject(userId: string) {
    this.projectService
      .createProjects({ name: 'Base name', userID: userId, description: 'Base description' })
      .subscribe({
        next: () => this.reload(),
      });
  }

  async deleteProject(payload: IDeleteProject) {
    this.projectService
      .deleteProject({ idProject: payload.idProject, actorID: payload.actorID })
      .subscribe({ next: () => this.reload() });
  }
}
