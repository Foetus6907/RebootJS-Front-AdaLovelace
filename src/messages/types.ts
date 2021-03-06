export interface IConversation {
  _id: string;
  targets: string[];
  updatedAt: string;
  unseenMessages: number;
  messages: IConversationMessage[];
}


export interface IConversationMessage {
  _id: string;
  conversationId: string;
  createdAt: string;
  emitter: string;
  targets: string[];
  content: string;
}

export const GET_ALL_CONVERSATIONS = "GET_ALL_CONVERSATIONS"
export interface IGetAllConversationsAction {
  type: typeof GET_ALL_CONVERSATIONS;
  conversations: IConversation[];
}

export const CHANGE_CURRENT_CONVERSATION = "CHANGE_CURRENT_CONVERSATION"
export interface IChangeCurrentConversationAction {
  type: typeof CHANGE_CURRENT_CONVERSATION;
  currentConversation?: IConversation
}

export const ADD_SENT_MESSAGE_TO_CONVERSATION = "ADD_SENT_MESSAGE_TO_CONVERSATION"
export interface  IAddSentMessageToConversationAction {
  type: typeof ADD_SENT_MESSAGE_TO_CONVERSATION;
  message: IConversationMessage
}


export const ADD_NEW_CONVERSATION_TO_CONVERSATIONS = "ADD_NEW_CONVERSATION_TO_CONVERSATIONS"
export interface IAddNewConversationToConversationsAction {
  type: typeof ADD_NEW_CONVERSATION_TO_CONVERSATIONS;
  newConversation: IConversation
}

export const SET_POLLING = "SET_POLLING"
export interface ISetPollingAction {
  type: typeof SET_POLLING
  polling: NodeJS.Timeout
}

export const STOP_POLLING = "STOP_POLLING"
export interface IStopPollingAction {
  type: typeof STOP_POLLING
  polling: undefined
}

export interface IMessagesState {
  currentConversation?: IConversation;
  conversations: IConversation[];
  polling?: NodeJS.Timeout;
}

export const UPDATE_CONVERSATION_WITH_NEW_MESSAGE = "UPDATE_CONVERSATION_WITH_NEW_MESSAGE"
export interface IUpdateConversationWithNewMessageAction {
  type: typeof UPDATE_CONVERSATION_WITH_NEW_MESSAGE,
  message: IConversationMessage
}

export type IMessagesAction = IGetAllConversationsAction | IChangeCurrentConversationAction
                                  | IAddSentMessageToConversationAction | IAddNewConversationToConversationsAction
                                  | ISetPollingAction | IStopPollingAction | IUpdateConversationWithNewMessageAction
