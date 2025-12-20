import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Message } from './pages/message/message';
import { Project } from './pages/project/project';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'message', component: Message },
  { path: 'projects/:id', component: Project },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
