import { Component, EventEmitter, inject, Output } from '@angular/core';
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
  private dialog = inject(UserChoiceDialogStore);
  @Output() choice = new EventEmitter<string>();
  users$ = this.userStore.users$;

  onHide() {
    this.dialog.close();
  }

  onChoiceUser(id: string) {
    this.onHide();
    this.choice.emit(id);
  }
}
