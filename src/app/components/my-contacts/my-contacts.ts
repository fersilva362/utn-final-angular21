import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { myContactsData } from '../../utils/data_source';
import { MyContactModel } from '../../models/Contact';
import { Client } from '../../services/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-contacts',
  imports: [],
  templateUrl: './my-contacts.html',
  styleUrl: './my-contacts.css',
})
export class MyContacts implements OnInit {
  private router = inject(Router);
  private client = inject(Client);
  ngOnInit(): void {
    this.getContacts();
  }
  myContacsLoaded = signal<MyContactModel[]>([]);
  loadingContacts = signal<boolean>(true);
  errorContacts = signal<string | null>(null);
  getContacts(): void {
    this.loadingContacts.set(false);
    this.errorContacts.set(null);
    this.myContacsLoaded.set(this.client.getContacts());
  }
  onClick(conversation_id: string) {
    this.router.navigate(['/contact', conversation_id]);
  }
}
