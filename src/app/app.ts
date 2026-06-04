import { Component, signal } from '@angular/core';
import { MyLayout } from './pages/my-layout/my-layout';

@Component({
  selector: 'app-root',
  imports: [MyLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
