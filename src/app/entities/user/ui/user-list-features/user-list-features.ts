import { Component, inject } from '@angular/core';
import { UserChoiceDialogStore } from '../../model/user-choice-dialog.store';

@Component({
  selector: 'app-user-list-features',
  imports: [],
  templateUrl: './user-list-features.html',
  styleUrl: './user-list-features.scss',
  standalone: true,
})
export class UserListFeatures {
  private dialog = inject(UserChoiceDialogStore);

  open() {
    this.dialog.open();
  }
}
