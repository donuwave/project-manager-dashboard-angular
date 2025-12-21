import { Component, inject } from '@angular/core';
import { SelectedProjectStore } from '../../entities/project/store/selected-project.store';
import { AsyncPipe } from '@angular/common';
import { AvatarGroupComponent } from '../../shared/ui/avatar-group/avatar-group';
import { Dialog } from 'primeng/dialog';
import { UsersList } from '../users-list/users-list';
import { UserChoiceDialogStore } from '../../entities/user/model/user-choice-dialog.store';
import { UserSessionStore } from '../../entities/user/model/user-session.store';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-project-invite',
  imports: [AsyncPipe, AvatarGroupComponent, Dialog, UsersList],
  templateUrl: './project-invite.html',
  styleUrl: './project-invite.scss',
  standalone: true,
})
export class ProjectInvite {
  private project = inject(SelectedProjectStore);
  private dialog = inject(UserChoiceDialogStore);
  private session = inject(UserSessionStore);

  project$ = this.project.project$;
  visible$ = this.dialog.visible$;
  me$ = this.session.me$;

  onHide() {
    this.dialog.close();
  }

  onOpen() {
    this.dialog.open();
  }

  async onChoiceUser(id: string) {
    const user = await firstValueFrom(this.session.me$);
    if (!user) return;

    await this.project.onInvite({ inviterId: user.id, userId: id });
  }
}
