import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { myContactsData } from '../../utils/data_source';
import { MyContactModel } from '../../models/Contact';
import { Client } from '../../services/client';

@Component({
  selector: 'app-my-contacts',
  imports: [],
  templateUrl: './my-contacts.html',
  styleUrl: './my-contacts.css',
})
export class MyContacts {
  private client = inject(Client);
  myContacsLoaded = signal<MyContactModel[]>([]);
  loadingContacts = signal<boolean>(true);
  errorContacts = signal<string | null>(null);
  getContacts(): void {
    this.loadingContacts.set(false);
    this.errorContacts.set(null);
    this.myContacsLoaded.set(this.client.getContacts());
  }
  constructor() {
    this.getContacts();
  }
}
