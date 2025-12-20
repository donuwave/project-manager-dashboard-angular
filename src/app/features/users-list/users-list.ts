import { Component, inject } from '@angular/core';
import { UserSessionStore } from '../../entities/user/model/user-session.store';
import { AsyncPipe } from '@angular/common';
import { UserListStore } from '../../entities/user/model/user-list.store';
import { UserChoiceDialogStore } from '../../entities/user/model/user-choice-dialog.store';
import { UserCard } from '../../entities/user/ui/user-card/user-card';

@Component({
  selector: 'app-users-list',
  imports: [AsyncPipe, UserCard],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  standalone: true,
})
export class UsersList {
  private userStore = inject(UserListStore);
  private session = inject(UserSessionStore);
  private dialog = inject(UserChoiceDialogStore);

  onHide() {
    this.dialog.close();
  }

  users$ = this.userStore.users$;

  onChoiceUser(id: string) {
    this.session.selectUser(id);
    this.onHide();
  }
}
