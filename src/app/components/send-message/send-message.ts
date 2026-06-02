import { Component, inject, Input } from '@angular/core';
import { MyContactModel } from '../../models/Contact';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CapitalizePipePipe } from '../../pipes/capitalize-pipe-pipe';

@Component({
  selector: 'app-send-message',
  imports: [DatePipe, CapitalizePipePipe],
  templateUrl: './send-message.html',
  styleUrl: './send-message.css',
})
export class SendMessage {
  private router = inject(Router);
  @Input()
  contact: MyContactModel | null = null;
  onClick(conversation_id: string) {
    this.router.navigate(['/contact', conversation_id]);
  }
}
