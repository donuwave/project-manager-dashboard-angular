import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateProject } from '../model/createProject.types';
import { IProject } from '../model/project.types';
import { IDeleteProject } from '../model/deleteProject.types';
import { IUpdateProject } from '../model/updateProject.types';

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

  deleteProject(payload: IDeleteProject) {
    return this.http.delete(`/api/projects/${payload.idProject}`, {
      body: {
        actorID: payload.actorID,
      },
    });
  }
}
