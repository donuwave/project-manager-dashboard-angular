import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /** id символа в спрайте, например "search" */
  @Input({ required: true }) name!: string;

  /** размер (px), применится к width/height */
  @Input() size = 20;

  /** путь к спрайту (если вдруг понадобится поменять) */
  @Input() spritePath = '/assets/sprite.svg';

  /** для accessibility: если указать title — будет role="img" и <title> */
  @Input() title?: string;

  /** если хочешь добавлять классы снаружи */
  @Input() className = '';

  /** обычно не нужно, но оставим на всякий */
  @Input() viewBox?: string;
}
