import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ISidebarMenu {
  id: string;
  src: string;
  title: string;
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  standalone: true,
})
export class SidebarMenu {
  menu: ISidebarMenu[] = [
    { id: '1', src: '/home', title: 'Home' },
    { id: '2', src: '/message', title: 'Message' },
    { id: '3', src: '/tasks', title: 'Tasks' },
    { id: '4', src: '/members', title: 'Members' },
    { id: '5', src: '/setting', title: 'Settings' },
  ];
}
