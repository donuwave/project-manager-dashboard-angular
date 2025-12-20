import { Component, inject } from '@angular/core';
import { ProjectsStore } from '../../entities/project/store/project.store';
import { AsyncPipe } from '@angular/common';
import { ProjectCard } from '../../entities/project/ui/project-card/project-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  imports: [AsyncPipe, ProjectCard, RouterLink],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
  standalone: true,
})
export class ProjectsList {
  private projectsStore = inject(ProjectsStore);
  projects$ = this.projectsStore.projects$;
}
