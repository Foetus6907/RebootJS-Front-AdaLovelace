import {
	ADD_NEW_CONVERSATION_TO_CONVERSATIONS,
	ADD_SENT_MESSAGE_TO_CONVERSATION,
	CHANGE_CURRENT_CONVERSATION,
	GET_ALL_CONVERSATIONS,
	IAddNewConversationToConversationsAction,
	IAddSentMessageToConversationAction,
	IChangeCurrentConversationAction,
	IConversation,
	IConversationMessage,
	IGetAllConversationsAction, ISetPollingAction, IStopPollingAction, SET_POLLING, STOP_POLLING
} from "../types";

export function changeCurrentConversationAction(currentConversation: IConversation): IChangeCurrentConversationAction {
	return {
		type: CHANGE_CURRENT_CONVERSATION,
		currentConversation: currentConversation,
	}
}

export function setAllConversationsAction(conversations: IConversation[]): IGetAllConversationsAction {
	return {
		type: GET_ALL_CONVERSATIONS,
		conversations: conversations
	}
}

export function addSentMessageToConversationAction(message: IConversationMessage): IAddSentMessageToConversationAction {
	return {
		type: ADD_SENT_MESSAGE_TO_CONVERSATION,
		message: message
	}
}

export function addNewConversationToConversationsAction(conversation: IConversation): IAddNewConversationToConversationsAction {
	return {
		type: ADD_NEW_CONVERSATION_TO_CONVERSATIONS,
		newConversation: conversation
	}
}

export function setPollingAction(polling: NodeJS.Timeout): ISetPollingAction {
	return {
		type: SET_POLLING,
		polling: polling
	}
}

export function stopPollingAction(): IStopPollingAction {
	return {
		type: STOP_POLLING,
		polling: undefined
	}
}
