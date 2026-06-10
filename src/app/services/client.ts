import { Injectable, signal } from '@angular/core';
import { Message, MyContactModel } from '../models/Contact';
import { myContactsData } from '../utils/data_source';
import { msg } from '../utils/data_other_usr';

@Injectable({
  providedIn: 'root',
})
export class Client {
  private myContacts = signal<MyContactModel[]>(myContactsData);
  myShareContacts = this.myContacts;

  //reactive variable for search bar
  mySearchContact = signal<MyContactModel | null>(null);

  myContactFiltered = signal<MyContactModel | null>(null);
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

  isAddingNewMessage: boolean = false;

  addNewMessage(newMessage: Message, conversation_id: string) {
    this.isAddingNewMessage = true;
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
    this.receiveMessageOtherUser(msg, conversation_id);
  }
  receiveMessageOtherUser = (msgReceived: any, conversation_id: string) => {
    msgReceived = { ...msgReceived, conversation_id };
    setTimeout(() => {
      this.myContacts.update((prev) =>
        prev.map((c) => {
          return c.conversation_id === msgReceived.conversation_id
            ? {
                ...c,
                last_message: msgReceived.message.content,
                last_message_time: new Date().toISOString(),
                messages: [...c.messages, msgReceived.message],
              }
            : c;
        }),
      );

      this.myContactFiltered.update((prev) => {
        if (!prev) {
          return null;
        }
        return { ...prev, messages: [...prev.messages, msgReceived.message] };
      });
    }, 2000);
  };

  handleSearch(text: string): void {
    const searchContact = [...this.myContacts()].find(({ participant_name }) =>
      participant_name.includes(text),
    );

    if (!searchContact) {
      this.mySearchContact.set(null);
    } else {
      this.mySearchContact.set(searchContact);
    }
  }
}
