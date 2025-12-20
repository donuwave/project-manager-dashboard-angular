import { Component, inject } from '@angular/core';
import { Input } from '../../shared/ui/input/input';
import { HeaderMenu } from '../../features/header-menu/header-menu';
import { HeaderProfile } from '../../features/header-profile/header-profile';
import { UserChoiceDialogStore } from '../../entities/user/model/user-choice-dialog.store';
import { AsyncPipe } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { UsersList } from '../../features/users-list/users-list';

@Component({
  selector: 'app-header',
  imports: [Input, HeaderMenu, HeaderProfile, AsyncPipe, Dialog, UsersList],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  private dialog = inject(UserChoiceDialogStore);

  visible$ = this.dialog.visible$;

  onHide() {
    this.dialog.close();
  }
}
