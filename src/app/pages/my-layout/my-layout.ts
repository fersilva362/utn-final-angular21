import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyContacts } from '../my-contacts/my-contacts';
import { Client } from '../../services/client';

@Component({
  selector: 'app-my-layout',
  imports: [RouterOutlet, MyContacts],
  templateUrl: './my-layout.html',
  styleUrl: './my-layout.css',
})
export class MyLayout {
  private client = inject(Client);

  checkChatIsOpen = computed(() => this.client.isChatOpen());
}
