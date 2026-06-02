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

  mySearchContact = signal<MyContactModel | null>(null);

  getContacts(): MyContactModel[] {
    console.log(this.myContacts());
    return [...this.myContacts()];
  }
  getContactByConversation(conversation_id: string): any {
    const contact_by_conversation = this.myContacts().find(
      (msg) => msg.conversation_id === conversation_id,
    );

    this.myContactFiltered.set(contact_by_conversation || null);

    /* return contact_by_conversation || null;;*/
  }

  addNewUser(user_raw: Omit<MyContactModel, 'conversation_id'>): void {
    const conversation_id = '8b5e6814-f6be-4868-9a3f-51f75b90fb75' + new Date().toISOString;
    const newContact = { ...user_raw, conversation_id };
    this.myContacts.update((prev) => [...prev, newContact]);
    //this.getContacts();
  }

  myContactFiltered = signal<MyContactModel | null>(null);

  addNewMessage(newMessage: Message, conversation_id: string) {
    this.myContacts.update((contacts) =>
      contacts.map((c) => {
        return c.conversation_id === conversation_id
          ? {
              ...c,
              last_message: newMessage.content,
              last_message_time: new Date().toISOString(),
              messages: [...c.messages, newMessage],
            }
          : c;
      }),
    );
  }
  handleSearch(text: string): void {
    const searchContact = [...this.myContacts()].find(({ participant_name }) =>
      participant_name.includes(text),
    );

    if (!searchContact) {
      this.mySearchContact.set(null);
    }
    console.log(searchContact);
    this.mySearchContact.set(searchContact!);
  }
}

/*  const handleSearch = (e) => {

  }, [contacts, searchInput]);
    if (e.key !== "Enter" || !searchInput.trim()) {
      setResultSearch(null);
      return;
    }
    setResultSearch([]);
    if (filteredByConversation.length != 0) {
      setResultSearch((prev) => [...(prev || []), ...filteredByConversation]);
    }
  }; */
