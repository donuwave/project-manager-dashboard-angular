import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateProject } from '../model/createProject.types';
import { IProject } from '../model/project.types';
import { IDeleteProject } from '../model/deleteProject.types';
import { IUpdateProject } from '../model/updateProject.types';
import { IInviteProject } from '../model/inviteProject.types';
import { ICreateTask } from '../model/createTask.types';
import { IDeleteTask } from '../model/deleleTask.types';
import { IUpdateTask } from '../model/updateTask.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  http = inject(HttpClient);

  getProjects() {
    return this.http.get<IProject[]>('/api/projects');
  }

  getProject(uuid: string) {
    return this.http.get<IProject>(`/api/projects/${uuid}`);
  }

  createProjects(payload: ICreateProject) {
    return this.http.post('/api/projects', payload);
  }

  updateProject(payload: IUpdateProject) {
    return this.http.patch(`/api/projects/${payload.id}`, {
      name: payload.name,
      description: payload.description,
    });
  }

  inviteProject({ projectId, ...payload }: IInviteProject) {
    return this.http.post(`/api/projects/${projectId}/invite`, payload);
  }

  deleteProject(payload: IDeleteProject) {
    return this.http.delete(`/api/projects/${payload.idProject}`, {
      body: {
        actorID: payload.actorID,
      },
    });
  }

  createTaskInProject({ projectId, ...payload }: ICreateTask) {
    return this.http.post(`/api/projects/${projectId}/tasks`, payload);
  }

  deleteTask({ taskID, ...payload }: IDeleteTask) {
    return this.http.delete(`/api/tasks/${taskID}`, {
      body: payload,
    });
  }

  updateTask({ taskID, ...payload }: IUpdateTask) {
    return this.http.patch(`/api/tasks/${taskID}`, payload);
  }
}
