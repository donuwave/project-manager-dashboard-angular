import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../model/user.types';
import { IconComponent } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-user-card',
  imports: [IconComponent],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
  standalone: true,
})
export class UserCard {
  @Input({ required: true }) user?: IUser;

  @Output() choose = new EventEmitter<string>();

  onChooseClick(event: MouseEvent) {
    event.stopPropagation();

    if (this.user) {
      this.choose.emit(this.user.id);
    }
  }
}
