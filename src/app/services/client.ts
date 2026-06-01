import { Injectable, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/Post';
import { Message, MyContactModel } from '../models/Contact';
import { myContactsData } from '../utils/data_source';

@Injectable({
  providedIn: 'root',
})
export class Client {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}
  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.apiUrl);
  }
  private myContacts = signal<MyContactModel[]>(myContactsData);
  myShareContacts = this.myContacts;

  getContacts(): MyContactModel[] {
    console.log(this.myContacts());
    return [...this.myContacts()];
  }
  getContactByConversation(conversation_id: string): MyContactModel | null {
    const contact_by_conversation = this.myContacts().find(
      (msg) => msg.conversation_id === conversation_id,
    );
    return contact_by_conversation || null;
  }

  addNewUser(user_raw: Omit<MyContactModel, 'conversation_id'>): void {
    const conversation_id = '8b5e6814-f6be-4868-9a3f-51f75b90fb75' + new Date().toISOString;
    const newContact = { ...user_raw, conversation_id };
    this.myContacts.update((prev) => [...prev, newContact]);
    this.getContacts();
  }
}
