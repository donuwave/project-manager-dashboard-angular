import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-project-edit',
  imports: [IconComponent],
  templateUrl: './project-edit.html',
  styleUrl: './project-edit.scss',
  standalone: true,
})
export class ProjectEdit {
  @Input() name!: string;
  @Output() update = new EventEmitter<string>();

  isEditing = false;

  open() {
    this.isEditing = true;
  }

  cancel() {
    this.isEditing = false;
  }

  onSubmit(value: string) {
    this.update.emit(value);
    this.cancel();
  }
}
