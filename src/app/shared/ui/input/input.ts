import { Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  imports: [InputText],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  standalone: true,
})
export class Input {}
