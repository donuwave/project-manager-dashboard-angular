import { Component, Input } from '@angular/core';

export interface AvatarUser {
  name: string;
  avatarUrl?: string | null;
}

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  templateUrl: './avatar-group.html',
  styleUrl: './avatar-group.scss',
})
export class AvatarGroupComponent {
  @Input() users: AvatarUser[] = [];
  @Input() maxVisible = 4;
  @Input() size = 40;
  @Input() overlap = 12;
  @Input() ring = 2;

  get visible(): AvatarUser[] {
    return this.users.slice(0, this.maxVisible);
  }

  get restCount(): number {
    return Math.max(0, this.users.length - this.maxVisible);
  }

  initials(name: string): string {
    const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
    return (first + last).toUpperCase();
  }

  trackByIndex = (i: number) => i;
}
