import { Injectable, signal } from '@angular/core';
import { Message, MyContactModel } from '../models/Contact';
import { myContactsData } from '../utils/data_source';

@Injectable({
  providedIn: 'root',
})
export class Client {
  private myContacts = signal<MyContactModel[]>(myContactsData);
  myShareContacts = this.myContacts;
  myContactFiltered = signal<MyContactModel | null>(null);
  //reactive variable for search bar
  mySearchContact = signal<MyContactModel | null>(null);

  getContactByConversation(conversation_id: string): any {
    const contact_by_conversation = this.myContacts().find(
      (msg) => msg.conversation_id === conversation_id,
    );
    this.myContactFiltered.set(contact_by_conversation || null);
  }
  addNewUser(user_raw: Omit<MyContactModel, 'conversation_id'>): void {
    const conversation_id = '8b5e6814-f6be-4868-9a3f-51f75b90fb75' + new Date().toISOString();
    const newContact = { ...user_raw, conversation_id };
    this.myContacts.update((prev) => [...prev, newContact]);
  }
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
    } else {
      this.mySearchContact.set(searchContact!);
    }
  }
}
