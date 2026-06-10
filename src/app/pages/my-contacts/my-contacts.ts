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
  hasSearched = signal<boolean>(false);
  myContacsLoaded = computed(() => this.client.myShareContacts());
  text = '';

  searchedContact = computed(() => this.client.mySearchContact());
  handleSearchContact() {
    this.hasSearched.set(true);
    this.errorSearchBar.set(null);
    const query = this.text.trim().toLowerCase();
    if (query) {
      this.client.handleSearch(this.text.trim());
    } else {
      this.errorSearchBar.set('⚠️ No results found. Please try a different keyword.');
      this.text = '';
    }
    console.log(this.errorSearchBar());
    console.log(this.searchedContact());
    console.log(this.hasSearched());
  }
  onInputChange() {
    if (this.hasSearched()) {
      this.hasSearched.set(false);
      this.errorSearchBar.set(null);
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
