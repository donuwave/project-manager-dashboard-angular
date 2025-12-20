import { Component, inject, Input } from '@angular/core';
import { IProject } from '../../model/project.types';
import { firstValueFrom } from 'rxjs';
import { UserSessionStore } from '../../../user/model/user-session.store';
import { ProjectsStore } from '../../store/project.store';
import { IconComponent } from '../../../../shared/ui/icon/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  standalone: true,
})
export class ProjectCard {
  @Input({ required: true }) project?: IProject;
  private session = inject(UserSessionStore);
  private projectsStore = inject(ProjectsStore);

  async onDelete(uuid: string) {
    const user = await firstValueFrom(this.session.me$);
    if (!user) return;

    await this.projectsStore.deleteProject({ idProject: uuid, actorID: user.id });
  }
}
