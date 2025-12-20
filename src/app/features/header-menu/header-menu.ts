import { Component } from '@angular/core';
import { IconComponent } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-header-menu',
  imports: [IconComponent],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
  standalone: true,
})
export class HeaderMenu {}
