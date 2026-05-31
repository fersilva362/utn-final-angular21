import { Routes } from '@angular/router';
import { MyContacts } from './components/my-contacts/my-contacts';
import { Post } from './components/post/post';
import { EmptyPage } from './components/empty-page/empty-page';
import { RegisterForm } from './components/register-form/register-form';
import { ChatPage } from './components/chat-page/chat-page';

export const routes: Routes = [
  { path: '', component: EmptyPage },
  { path: 'post', component: Post },
  { path: 'add', component: RegisterForm },
  { path: 'contact/:conversation_id', component: ChatPage },
  { path: '**', redirectTo: '' },
];
