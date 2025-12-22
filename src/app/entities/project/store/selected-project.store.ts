import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProjectService } from '../api/project.service';
import {
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { IUpdateProject } from '../model/updateProject.types';
import { ProjectsStore } from './project.store';
import { IInviteProject } from '../model/inviteProject.types';
import { ITask } from '../../task/model/model/task.types';
import { IProject } from '../model/project.types';
import { ICreateTask } from '../model/createTask.types';
import { IDeleteTask } from '../model/deleleTask.types';
import { IUpdateTask } from '../model/updateTask.types';
import { Task } from '../../kanban/model/kanban.types';

export interface IColumn {
  id: number;
  title: string;
  color: 'purple' | 'orange' | 'green';
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class SelectedProjectStore {
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private projectsStore = inject(ProjectsStore);

  private refresh$ = new Subject<void>();
  private projectId$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    startWith(null),
    map(() => this.router.url.split('/').pop() ?? null),
    filter((id): id is string => !!id),
    distinctUntilChanged(),
    shareReplay(1),
  );

  reload() {
    this.refresh$.next();
  }

  readonly project$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() => this.projectId$),
    switchMap((id) => this.projectService.getProject(id)),
    shareReplay(1),
  );

  async onUpdate(payload: Pick<IUpdateProject, 'name' | 'description'>) {
    const project = await firstValueFrom(this.project$);
    if (!project) return;

    await firstValueFrom(this.projectService.updateProject({ ...payload, id: project.id }));

    this.reload();
    this.projectsStore.reload();
  }

  async onInvite(payload: Pick<IInviteProject, 'inviterId' | 'userId'>) {
    const project = await firstValueFrom(this.project$);
    if (!project) return;

    await firstValueFrom(
      this.projectService.inviteProject({
        projectId: project.id,
        inviterId: payload.inviterId,
        userId: payload.userId,
      }),
    );

    this.reload();
  }

  getStatusIndex = (status: ITask['status']): number => {
    switch (status) {
      case 'todo':
        return 1;
      case 'in_progress':
        return 2;
      default:
        return 3;
    }
  };

  getIndexStatus = (index: number): ITask['status'] => {
    switch (index) {
      case 1:
        return 'todo';
      case 2:
        return 'in_progress';
      default:
        return 'done';
    }
  };

  onGetTasks$(): Observable<IColumn[]> {
    return this.project$.pipe(
      filter((p): p is IProject => !!p),
      map((project) => {
        const columns: IColumn[] = [
          { title: 'Todo', id: 1, color: 'purple', tasks: [] },
          { title: 'In Progress', id: 2, color: 'green', tasks: [] },
          { title: 'Done', id: 3, color: 'orange', tasks: [] },
        ];

        for (const el of project.tasks) {
          const idx = this.getStatusIndex(el.status);
          columns[idx - 1].tasks.push({
            id: el.id,
            title: el.title,
            description: el.description,
            position: el.position,
            comments: 10,
            files: 1,
            priority: 'High',
            assignees: [],
          });
        }

        return columns;
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  async onAddTask(payload: Omit<ICreateTask, 'projectId'>) {
    const project = await firstValueFrom(this.project$);
    if (!project) return;

    await firstValueFrom(
      this.projectService.createTaskInProject({ projectId: project.id, ...payload }),
    );

    this.reload();
  }

  async onDeleteTask(payload: IDeleteTask) {
    await firstValueFrom(this.projectService.deleteTask(payload));
    this.reload();
  }

  async onUpdateTask(payload: IUpdateTask) {
    await firstValueFrom(this.projectService.updateTask(payload));
    this.reload();
  }
}
