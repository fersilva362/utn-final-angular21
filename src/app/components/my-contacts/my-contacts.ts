import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { myContactsData } from '../../utils/data_source';
import { MyContactModel } from '../../models/Contact';
import { Client } from '../../services/client';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CapitalizePipePipe } from '../../pipes/capitalize-pipe-pipe';
import { SendMessage } from '../send-message/send-message';

@Component({
  selector: 'app-my-contacts',
  imports: [SendMessage],
  templateUrl: './my-contacts.html',
  styleUrl: './my-contacts.css',
})
export class MyContacts {
  private router = inject(Router);
  client = inject(Client);
  /*  ngOnInit(): void {
    this.getContacts();
  } */
  /* myContacsLoaded = signal<MyContactModel[]>([]); */
  loadingContacts = signal<boolean>(true);
  errorContacts = signal<string | null>(null);
  myContacsLoaded = computed(() => this.client.myShareContacts());

  /* getContacts(): void {
    this.loadingContacts.set(false);
    this.errorContacts.set(null);
    this.myContacsLoaded.set(this.client.getContacts());
  } */
  onClick(conversation_id: string) {
    this.router.navigate(['/contact', conversation_id]);
  }
  navigateToForm() {
    this.router.navigate(['/add']);
  }
}
