import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../services/client';
import { Message, MyContactModel } from '../../models/Contact';

@Component({
  selector: 'app-chat-page',
  imports: [],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css',
})
export class ChatPage implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private client = inject(Client);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ conversation_id }) => {
      this.loadingMessages.set(false);
      this.errorMessages.set(null);

      this.myContactLoaded.set(this.client.getContactByConversation(conversation_id!) || null);
    });
  }

  myContactLoaded = signal<MyContactModel | null>(null);
  loadingMessages = signal<boolean>(true);
  errorMessages = signal<string | null>(null);
}
