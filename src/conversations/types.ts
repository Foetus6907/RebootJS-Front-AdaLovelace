export interface IConversation {
  _id: string;
  target: string[];
  updateAt: string;
  unseenMessages: number;
  messages: IConversationMessage
}

export interface IConversationMessage {
  _id: string;
  conversationId: string;
  createdAt: string;
  emitter: string;
  targets: string[];
  content: string;
}