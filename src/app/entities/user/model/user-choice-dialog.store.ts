import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserChoiceDialogStore {
  private readonly _visible = new BehaviorSubject<boolean>(false);

  readonly visible$ = this._visible.asObservable().pipe(distinctUntilChanged());

  open() {
    this._visible.next(true);
  }

  close() {
    this._visible.next(false);
  }

  toggle() {
    this._visible.next(!this._visible.value);
  }
}
