import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  getUsers() {
    return this.http.get<IUser[]>(`/api/users`);
  }

  getUser(uuid: string) {
    return this.http.get<IUser>(`/api/users/${uuid}`);
  }
}
