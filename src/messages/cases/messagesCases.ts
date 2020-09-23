import {
	ADD_NEW_CONVERSATION_TO_CONVERSATIONS,
	ADD_SENT_MESSAGE_TO_CONVERSATION,
	CHANGE_CURRENT_CONVERSATION,
	GET_ALL_CONVERSATIONS,
	IAddNewConversationToConversationsAction,
	IAddSentMessageToConversationAction,
	IConversation,
	IMessagesAction,
	IMessagesState,
	ISetPollingAction,
	IStopPollingAction,
	SET_POLLING,
	STOP_POLLING
} from "../types";

export function changeCurrentConversationCase(state: IMessagesState, action: IMessagesAction) : IMessagesState {
	if (action.type === CHANGE_CURRENT_CONVERSATION)
	return {
		...state,
		currentConversation: action.currentConversation,
	}
	return state
}

export function getAllConversationsCase(state: IMessagesState, action: IMessagesAction) : IMessagesState {
	if (action.type === GET_ALL_CONVERSATIONS)
		return {
			...state,
			conversations: action.conversations,
		}
	return state
}



export 	function addSentMessageToConversationCase(state: IMessagesState, action: IAddSentMessageToConversationAction): IMessagesState {
	if (action.type === ADD_SENT_MESSAGE_TO_CONVERSATION)
		return {
			...state,
			conversations: state.conversations.map((conversation: IConversation) => {
				if (action.message.conversationId === conversation._id) {
					conversation.messages = [...conversation.messages, action.message]
					return conversation
				}
				return conversation
			})
		}
	return state
}

export function addNewConversationToConversationsCase(state: IMessagesState, action:IAddNewConversationToConversationsAction): IMessagesState {
	if (action.type === ADD_NEW_CONVERSATION_TO_CONVERSATIONS)
		return {
			...state,
			conversations: [...state.conversations, action.newConversation]
		}
	return state
}

export function setPollingStateCase(state: IMessagesState, action:ISetPollingAction): IMessagesState {
	if (action.type === SET_POLLING) {
		return {
			...state,
			polling: action.polling
		}
	}
	return state
}

export function stopPollingStateCase(state: IMessagesState, action:IStopPollingAction): IMessagesState {
	if (action.type === STOP_POLLING) {
		return {
			...state,
			polling: action.polling
		}
	}
	return state
}
