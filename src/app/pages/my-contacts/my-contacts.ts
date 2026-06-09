import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { myContactsData } from '../../utils/data_source';
import { MyContactModel } from '../../models/Contact';
import { Client } from '../../services/client';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CapitalizePipePipe } from '../../pipes/capitalize-pipe-pipe';
import { SendMessage } from '../../components/send-message/send-message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-contacts',
  imports: [SendMessage, FormsModule],
  templateUrl: './my-contacts.html',
  styleUrl: './my-contacts.css',
})
export class MyContacts {
  private router = inject(Router);
  private client = inject(Client);

  loadingContacts = signal<boolean>(true);
  errorContacts = signal<string | null>(null);
  errorSearchBar = signal<string | null>(null);
  myContacsLoaded = computed(() => this.client.myShareContacts());
  text = '';

  searchedContact = computed(() => this.client.mySearchContact());
  handleSearchContact() {
    this.errorSearchBar.set(null);
    if (this.text.trim()) {
      this.client.handleSearch(this.text.trim());
    } else {
      this.errorSearchBar.set('⚠️ No results found. Please try a different keyword.');
      this.text = '';
    }
  }
  onClick(conversation_id: string, urlPhoto: string) {
    this.router.navigate(['/contact', conversation_id], {
      state: { urlPhoto: urlPhoto },
    });
  }
  navigateToForm() {
    this.router.navigate(['/add']);
  }
}
