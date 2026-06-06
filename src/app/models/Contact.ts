export interface MyContactModel {
  conversation_id: string;
  participant_name: string;
  last_message: string;
  last_message_time: string;
  messages: Message[];
  status?: string;
}
export interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}
