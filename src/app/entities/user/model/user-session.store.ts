import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, distinctUntilChanged, map, of, shareReplay, switchMap } from 'rxjs';
import { IUser } from './user.types';

@Injectable({ providedIn: 'root' })
export class UserSessionStore {
  private api = inject(UserService);
  private cookies = inject(CookieService);

  private readonly selectedId$ = new BehaviorSubject<string | null>(
    this.cookies.get('selectedId') || null,
  );

  readonly me$ = this.selectedId$.pipe(
    map((id) => id?.trim() || null),
    distinctUntilChanged(),
    switchMap((id) => (id ? this.api.getUser(id) : of(null as IUser | null))),
    shareReplay(1),
  );

  selectUser(id: string) {
    this.selectedId$.next(id);
    this.cookies.set('selectedId', id);
  }
}
