import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserListStore {
  private userService = inject(UserService);

  users$ = this.userService.getUsers().pipe(shareReplay(1));
}
