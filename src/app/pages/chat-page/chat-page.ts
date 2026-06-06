import {
  Component,
  computed,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../services/client';
import { Message, MyContactModel } from '../../models/Contact';
import { FormsModule } from '@angular/forms';
import { CapitalizePipePipe } from '../../pipes/capitalize-pipe-pipe';

@Component({
  selector: 'app-chat-page',
  imports: [FormsModule, CapitalizePipePipe],
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
      this.client.getContactByConversation(conversation_id);
    });
  }

  text: string = '';
  userId: string = '96';
  myContactLoaded = signal<MyContactModel | null>(null);
  myTestLoaded = computed(() => this.client.myContactFiltered());
  loadingMessages = signal<boolean>(true);
  errorMessages = signal<string | null>(null);

  navigateToOrigin() {
    this.router.navigate(['/']);
  }
  sendMessage(conversation_id: string | null) {
    if (!this.text.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      content: this.text,
      sender_id: this.userId.toString(),
      created_at: new Date().toISOString(),
    };
    if (conversation_id) {
      this.client.addNewMessage(newMessage, conversation_id);
      this.client.getContactByConversation(conversation_id);
    }
    this.text = '';
  }
}
