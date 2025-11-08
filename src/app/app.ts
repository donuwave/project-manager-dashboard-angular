import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Header } from './widgets/header/header';
import { Sidebar } from './widgets/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, InputTextModule, Header, Sidebar],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('project');
}
