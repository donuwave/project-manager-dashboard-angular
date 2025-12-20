import { Component } from '@angular/core';
import { SidebarMenu } from '../../features/sidebar-menu/sidebar-menu';
import { ProjectsList } from '../projects-list/projects-list';
import { CreateProject } from '../../features/create-project/create-project';

@Component({
  selector: 'sidebar',
  imports: [SidebarMenu, ProjectsList, CreateProject],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
})
export class Sidebar {}
