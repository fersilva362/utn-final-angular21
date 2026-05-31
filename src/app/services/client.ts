import { Injectable, OnInit } from '@angular/core';
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
  private myContacts: MyContactModel[] = myContactsData;
  getContacts(): MyContactModel[] {
    return [...this.myContacts];
  }
  getContactByConversation(conversation_id: string): MyContactModel | null {
    const contact_by_conversation = this.myContacts.find(
      (msg) => msg.conversation_id === conversation_id,
    );
    return contact_by_conversation || null;
  }
}
