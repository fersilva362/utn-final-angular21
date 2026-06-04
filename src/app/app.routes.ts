import { Routes } from '@angular/router';
import { MyContacts } from './pages/my-contacts/my-contacts';
import { EmptyPage } from './pages/empty-page/empty-page';
import { ChatPage } from './pages/chat-page/chat-page';
import { RegisterForm } from './pages/register-form/register-form';

export const routes: Routes = [
  { path: '', component: EmptyPage },
  { path: 'add', component: RegisterForm },
  { path: 'contact/:conversation_id', component: ChatPage },
  { path: '**', redirectTo: '' },
];
