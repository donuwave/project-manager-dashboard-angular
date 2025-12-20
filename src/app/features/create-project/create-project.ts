import { Component, inject } from '@angular/core';
import { UserSessionStore } from '../../entities/user/model/user-session.store';
import { firstValueFrom } from 'rxjs';
import { ProjectsStore } from '../../entities/project/store/project.store';

@Component({
  selector: 'app-create-project',
  imports: [],
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss',
  standalone: true,
})
export class CreateProject {
  private session = inject(UserSessionStore);
  private projectsStore = inject(ProjectsStore);

  async onCreate() {
    const user = await firstValueFrom(this.session.me$);
    if (!user) return;

    await this.projectsStore.createProject(user.id);
  }
}
