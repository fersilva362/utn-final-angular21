import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './components/post/post';
import { MyContacts } from './components/my-contacts/my-contacts';
import { RegisterForm } from './components/register-form/register-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyContacts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
