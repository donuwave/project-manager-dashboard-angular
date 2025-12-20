import { Component, inject } from '@angular/core';
import { IconComponent } from '../../shared/ui/icon/icon';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';
import { UserListFeatures } from '../../entities/user/ui/user-list-features/user-list-features';
import { UserSessionStore } from '../../entities/user/model/user-session.store';

@Component({
  selector: 'app-header-profile',
  imports: [IconComponent, PopoverModule, ButtonModule, AsyncPipe, UserListFeatures],
  templateUrl: './header-profile.html',
  styleUrl: './header-profile.scss',
  standalone: true,
})
export class HeaderProfile {
  private session = inject(UserSessionStore);
  popoverOpen = false;
  user$ = this.session.me$;

  toggle(op: Popover, event: Event): void;
  toggle(op: Popover, event: MouseEvent): void;
  toggle(op: Popover, event: KeyboardEvent): void;
  toggle(op: Popover, event: Event): void {
    op.toggle(event);
  }

  onPopoverShow() {
    this.popoverOpen = true;
  }

  onPopoverHide() {
    this.popoverOpen = false;
  }
}
