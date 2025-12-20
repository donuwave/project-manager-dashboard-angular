import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProjectService } from '../api/project.service';
import {
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { IUpdateProject } from '../model/updateProject.types';

@Injectable({
  providedIn: 'root',
})
export class SelectedProjectStore {
  private router = inject(Router);
  private projectService = inject(ProjectService);
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
  }
}
